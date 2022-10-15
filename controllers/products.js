const { response } = require("express");
const { Product } = require("../models");

//obtener productos

const obtenerProductos = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, productos] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .limit(Number(limite))
      .skip(Number(desde))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);
  res.status(200).json({
    total,
    productos,
  });
};

//obtener un producto

const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Product.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");
  res.status(200).json(producto);
};

//crear un producto

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;
  const productoDB = await Product.findOne({ nombre: body.nombre });

  if (productoDB) { 
    return res
      .status(400)
      .json({ msg: `El producto ${productoDB.nombre},ya existe` });
  }
  // Generar la data a guardar

  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const producto = new Product(data);

  //guardar en DB
  await producto.save();
  res.status(201).json(producto);
};

// Actualizar el producto por ID
const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.usuario._id;
  const producto = await Product.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json(producto);
};

// Borrar el producto por ID

const borrarProducto = async (req, res) => {
  const { id } = req.params;
  const productoEliminado = await Product.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.status(200).json(productoEliminado);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};
