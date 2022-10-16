const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
});

productSchema.methods.toJSON = function () {
  const { __v, estado, ...product } = this.toObject();
  return product;
};

module.exports = model("Product", productSchema);
