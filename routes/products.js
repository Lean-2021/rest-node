const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/products");
const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

// /api/productos

//obtener todas los productos - publico

router.get("/", obtenerProductos);

//obtener un producto por ID - publico

router.get(
  "/:id",
  [
    check("id", "No es un ID válido de mongo").isMongoId(),
    check("id", "No existe un producto correspondiente con ese Id").custom(
      existeProducto
    ),
    validarCampos,
  ],
  obtenerProducto
);

// crear una producto - Privado - cualquier persona con un token valido

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un Id válido").isMongoId(),
    check("categoria").custom(existeCategoria),
    validarCampos,
  ],
  crearProducto
);

//actualizar productos - Privado - cualquier persona con un token valido

router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "No es un Id de mongo").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  actualizarProducto
);

//borrar categoria - solo Admin

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido de mongo").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
