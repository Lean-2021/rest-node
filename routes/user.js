const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/user");
const {
  esRoleValido,
  emailExistente,
  existeUsuarioById,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", getUser);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y debe ser mayor a 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExistente),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "El ID ingresado no es válido").isMongoId(), //chequear ID válido de mongoID
    check("id").custom(existeUsuarioById), // chequear que el ID ingresado exista
    check("rol").custom(esRoleValido), //Validar el ingresode roles existentes en la base de datos
    validarCampos,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    check("id", "El ID ingresado no es válido").isMongoId(), //chequear ID válido de mongoID
    check("id").custom(existeUsuarioById), // chequear que el ID ingresado exista
    validarCampos,
  ],
  deleteUser
);

module.exports = router;
