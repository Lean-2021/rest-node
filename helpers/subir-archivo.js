const path = require("path");
const { v4: uuidv4 } = require("uuid");

const images = ["png", "jpg", "jpeg", "gif", "webp"];

const subirArchivo = (files, extensionesValidas = images, carpeta = "") => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // validar extension
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extension ${extension} no esta permitida, solo se admite : ${extensionesValidas}`
      );
    }
    const nombreTemporal = uuidv4() + "." + extension;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      carpeta,
      nombreTemporal
    );
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(nombreTemporal);
    });
  });
};

module.exports = {
  subirArchivo,
};
