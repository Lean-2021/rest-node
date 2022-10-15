const Category = require("./Category");
const Role = require("./role");
const Usuario = require("./usuario");
const Server = require("./server");
const Product = require("./product");

module.exports = {
  ...Category,
  ...Product,
  ...Role,
  ...Usuario,
  ...Server,
};
