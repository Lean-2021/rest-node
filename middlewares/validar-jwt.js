const jwt = require("jsonwebtoken");
const usuario = require("../models/usuario");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No tiene permisos suficientes para realizar esta accion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer el usuario que corresponde con el uid
    const usuarioAutenticado = await usuario.findById(uid);

    if (!usuarioAutenticado) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en DB",
      });
    }

    //Verificar si el UID tiene estado en true
    if (!usuarioAutenticado.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario estado en false",
      });
    }

    req.usuario = usuarioAutenticado;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "El token no es válido",
    });
  }
};

module.exports = {
  validarJWT,
};
