const esAdminRole = (req, res, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token",
    });
  }

  const { rol, nombre } = req.user;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador`,
    });
  }
  next();
};

module.exports = {
  esAdminRole,
};
