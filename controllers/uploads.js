const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivos = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: "No hay archivos para subir" });
  }
  //imagenes - helpers
  try {
    const nombre = await subirArchivo(req.files, undefined, "images");
    res.json({
      nombre,
    });
  } catch (msg) {
    res.json({ msg });
  }
};
// actualizar imagenes
const actualizarImagen = async (req, res = response) => {
  const { coleccion, id } = req.params;
  res.json({ coleccion, id });
};

module.exports = {
  cargarArchivos,
  actualizarImagen,
};
