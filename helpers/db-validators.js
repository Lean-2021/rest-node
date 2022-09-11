const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  //verificar roles permitidos
  const existRole = await Role.findOne({ rol });
  if (!existRole) {
    throw new Error(`El rol ${rol} no está registrado en la Base de datos`);
  }
};

//Verificar si existe el correo
const emailExistente = async (correo = "") => {
  const emailExists = await Usuario.findOne({ correo });
  if (emailExists) {
    throw new Error(
      `Ya existe un usuario con el email ${correo} registrado. Por favor,ingrese otro email`
    );
  }
};

//verficar si existe un usuario por ID

const existeUsuarioById=async(id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`No existe un usuario con el id: ${id}`);
    }
}

module.exports = {
  esRoleValido,
  emailExistente,
  existeUsuarioById
};
