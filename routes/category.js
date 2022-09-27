const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/category");
const { existeCategoria } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

// /api/categorias

//obtener todas las categorias - publico

router.get("/", obtenerCategorias);

//obtener una categoria por ID - publico

router.get(
  "/:id",
  [
    check("id", "No es un ID válido de mongo").isMongoId(),
    check("id", "No existe una categoria correspondiente con ese Id").custom(
      existeCategoria
    ),
    validarCampos,
  ],
  obtenerCategoria
);

// crear una categoria - Privado - cualquier persona con un token valido

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//actualizar categorias - Privado - cualquier persona con un token valido

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No existe una categoria correspondiente con ese Id").custom(
      existeCategoria
    ),
    validarCampos,
  ],
  actualizarCategoria
);

//borrar categoria - solo Admin

router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check("id", "No es un ID válido de mongo").isMongoId(),
  check("id", "No existe una categoria correspondiente con ese Id").custom(
    existeCategoria
  ),
  validarCampos
],borrarCategoria);

module.exports = router;
