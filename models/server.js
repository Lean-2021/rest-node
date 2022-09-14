const express = require("express");
const cors = require('cors');
const { connectionDB } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT; //puerto de la app
    this.usersPath= '/api/usuarios';
    this.authPath= '/api/auth';

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
    this.app.use(express.static('public'));
  }

  async conectarDB(){
    await connectionDB();
  }

  routes() {
    this.app.use(this.authPath,require('../routes/auth'));  // ruta de autentificacion
    this.app.use(this.usersPath,require('../routes/user')); // ruta de usuarios
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}...📢📢🛶`);
    });
  }
}

module.exports = Server;
