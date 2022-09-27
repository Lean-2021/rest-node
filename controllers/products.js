const Product = require("../models/product");

//crear un producto

const crearProducto = async (req,res) => {
  const product = req.body;
  const newProduct = new Product(product);
  await product.save();
};
