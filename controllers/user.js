const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const getUser = (req, res) => {
  const { q, nombre = "no name", key } = req.query;
  res.status(200).json({
    msg: "Mensaje GET api",
    q,
    nombre,
    key,
  });
};

const postUser = async (req, res) => {

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Verificar si existe el correo
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    return res.status(400).json({
      msg: "El correo ya está registrado",
    });
  }

  //Encryptar la contraseña
  const encriptar = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, encriptar);
  //Guardar en DB
  await usuario.save();
  res.status(200).json({
    usuario,
  });
};

const putUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    msg: "Mensaje PUT api",
    id,
  });
};

const deleteUser = (req, res) => {
  res.status(200).json({
    msg: "Mensaje DELETE api",
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
};
