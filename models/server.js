import * as dotenv from "dotenv";
import {router} from '../routes/user.routes.js';
dotenv.config();
import express from "express";
import cors from "cors";
import { dbConnection } from '../database/config.js'
import { routerLogin } from "../routes/auth.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth"

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, routerLogin)
    this.app.use(this.usuariosPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:", this.port);
    });
  }
}

export default Server;
