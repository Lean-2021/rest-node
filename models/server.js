const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { connectionDB } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT; //puerto de la app

    //rutas Path
    this.paths = {
      auth: "/api/auth",
      category: "/api/categorias",
      products: "/api/productos",
      search: "/api/buscar",
      user: "/api/usuarios",
      uploads: "/api/uploads",
    };

    //conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();
    // Rutas de mi aplicacion
    this.routes();
  }
  middlewares() {
    // CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());
    //directorio publico
    this.app.use(express.static("public"));

    //file upload - carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  async conectarDB() {
    await connectionDB();
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth")); // ruta de autentificacion
    this.app.use(this.paths.user, require("../routes/user")); // ruta de usuarios
    this.app.use(this.paths.category, require("../routes/category")); // ruta de categorias
    this.app.use(this.paths.products, require("../routes/products")); // ruta productos
    this.app.use(this.paths.search, require("../routes/search")); // ruta busqueda
    this.app.use(this.paths.uploads, require("../routes/uploads")); // ruta subida de archivos
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}...📢📢🛶`);
    });
  }
}

module.exports = Server;
