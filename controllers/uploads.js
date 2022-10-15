const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivos = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: "No hay archivos para subir" });
  }

  //imagenes - helpers
  const nombre = await subirArchivo(req.files);

  res.json({
    nombre,
  });
};

module.exports = {
  cargarArchivos,
};
