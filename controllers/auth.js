const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res
        .status(400)
        .json({ msg: "Usuario / contraseña no son correctos - correo" });
    }
    //verificar si el usuario esta activo

    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: "Usuario / contraseña no son correctos - estado:false" });
    }
    //Verificar la contraseña

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: "Usuario / contraseña no son correctos - password" });
    }

    //Generar JWT Json WEb Token

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error, Hable con el administrador" });
  }
};

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      //crear usuario si no existe
      const data = {
        nombre,
        correo,
        password: "password",
        img,
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    // si el usuario en DB esta en estado false

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT - Json Web Token
    const token = await generarJWT(usuario.id);

    res.status(200).json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "El token no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
