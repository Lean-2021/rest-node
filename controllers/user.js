const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const getUser = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).limit(Number(limite)).skip(Number(desde)),
  ]);
  res.status(200).json({
    total,
    usuarios,
  });
};

const postUser = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encryptar la contraseña
  const encriptar = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, encriptar);
  //Guardar en DB
  await usuario.save();
  res.status(200).json({
    usuario,
  });
};

const putUser = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...restInfo } = req.body;

  //validar con la base de datos

  if (password) {
    //Encryptar la contraseña
    const encriptar = bcryptjs.genSaltSync(10);
    restInfo.password = bcryptjs.hashSync(password, encriptar);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, restInfo);

  res.status(200).json(usuario);
};

const deleteUser = async (req, res) => {
  //borrar usuario
  const { id } = req.params;
 
  //borrar fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id);

  //cambiar estado a false no se borra fisicamente de la base de datos
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

  res.status(200).json(usuario);
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
};
