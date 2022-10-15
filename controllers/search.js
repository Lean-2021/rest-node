const { response } = require("express");
const { Usuario, Category, Product, Role } = require("../models");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"]; //las colecciones que tenemos

// busqueda usuarios
const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); // regresa true o false

  if (esMongoId) {
    //busca usuario por ID
    const findUsuario = await Usuario.findById(termino);
    return res.json({
      results: findUsuario ? [findUsuario] : [],
    });
  }
  // expresion regular -  insensible a mayusculas o terminos exactos
  const regex = new RegExp(termino, "i");

  //poner usuario.count para obtener en la busqueda el número de coincidencias
  const usuarios = await Usuario.find({
    // condicion buscar por nombre ó email
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  return res.json({
    results: usuarios,
  });
};

// buscar categorias
const buscarCategorias = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    // busca categoria por ID
    const category = await Category.findById(termino);
    return res.json({
      results: category ? [category] : [],
    });
  }
  // expresion regular - espacios mayusculas/minusculas
  const regex = new RegExp(termino, "i");
  // condicion buscar por nombre
  const categorias = await Category.find({
    nombre: regex,
    $and: [{ estado: true }],
  });
  return res.json({
    results: categorias,
  });
};

// buscar productos

// buscar categorias
const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    // busca categoria por ID
    const producto = await Product.findById(termino).populate('categoria','nombre');
    return res.json({
      results: producto ? [producto] : [],
    });
  }
  // expresion regular - espacios mayusculas/minusculas
  const regex = new RegExp(termino, "i");
  // condicion buscar por nombre
  const productos = await Product.find({
    nombre: regex,
    $and: [{ estado: true }],
  }).populate('categoria','nombre');
  return res.json({
    results: productos,
  });
};

const search = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }
  // condiciones de busqueda
  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Aun no implementado",
      });
  }
};

module.exports = {
  search,
};
