const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/user");
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
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  postUser
);

router.put("/:id", putUser);

router.delete("/", deleteUser);

module.exports = router;
