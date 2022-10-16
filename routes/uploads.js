const { Router } = require("express");
const { check } = require("express-validator");
const {
  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
} = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validarArchivo, validarCampos } = require("../middlewares");

const router = Router();

router.get(
  "/:coleccion/:id",
  [
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

router.post("/", validarArchivo, cargarArchivos);
router.put(
  "/:coleccion/:id",
  [
    validarArchivo,
    check("id", "El ID debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  // actualizarImagen
  actualizarImagenCloudinary
);

module.exports = router;
