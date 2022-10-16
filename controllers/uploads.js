const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Product } = require("../models");

cloudinary.config(process.env.CLOUDINARY_URL); // configuracion de cloudinary

const cargarArchivos = async (req, res = response) => {
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
// actualizar imagenes - validar datos
const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
    case "productos":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;
    default:
      return res.status(500).json({ msg: " se me olvido validar esto" });
  }

  // limpiar imagenes previas
  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save(); // guardar en la base de datos

  res.json(modelo);
};

// actualizar imagen guardandola en cloudinary

const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
    case "productos":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;
    default:
      return res.status(500).json({ msg: " se me olvido validar esto" });
  }

  // limpiar imagenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  modelo.img = secure_url;
  await modelo.save(); // guardar en la base de datos

  res.json(modelo);
};

// mostrar imagen URL

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
    case "productos":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;
    default:
      return res.status(500).json({ msg: " se me olvido validar esto" });
  }

  // limpiar imagenes previas
  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }
  // imagen por defecto si no se carga una
  const pathNotImg = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathNotImg);
};

module.exports = {
  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
};
