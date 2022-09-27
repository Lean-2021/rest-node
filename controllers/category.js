const { response } = require("express");
const { Category } = require("../models");

//obtener categorias

const obtenerCategorias = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, categorias] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).limit(Number(limite)).skip(Number(desde)).populate("usuario", "nombre")
  ]);
  res.status(200).json({
    total,
    categorias,
  });
};

  //obtener una categoria

const obtenerCategoria=async(req,res)=>{
    const {id} = req.params;
    const categoria = await Category.findById(id).populate('usuario','nombre');
    res.status(200).json(categoria);
}

//crear una categoria

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Category.findOne({ nombre });

  if (categoriaDB) {
    return res
      .status(400)
      .json({ msg: `La categoria ${categoriaDB.nombre},ya existe` });
  }
  // Generar la data a guardar

  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Category(data);

  //guardar en DB
  await categoria.save();
  res.status(201).json(categoria);
};

// Actualizar la categoria por ID
const actualizarCategoria=async(req,res)=>{
  const {id}=req.params;
  const{estado,usuario,...data} =req.body;
  data.nombre=data.nombre.tuUpperCase();
  data.usuario=req.usuario._id;
  const categoria = await Category.findByIdAndUpdate(id,data,{new:true});
  res.status(200).json(categoria);
}

// Borrar la categoria por ID

const borrarCategoria=async(req,res)=>{
  const {id}=req.params;
  const categoriaEliminada = await Category.findByIdAndUpdate(id,{estado:false},{new:true});
  res.status(200).json(categoriaEliminada);
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
};
