import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import { dbConnection } from "../database/config.js";

import {
  router,
  routerUploads,
  routerLogin,
  routerCategoria,
  routerProducto,
  routerBusqueda,
} from "../routes/index.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      categorias: "/api/categorias",
      productos: "/api/productos",
      usuarios: "/api/usuarios",
      uploads: "/api/uploads",
    };

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

    // FileUpload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, routerLogin);
    this.app.use(this.paths.buscar, routerBusqueda);
    this.app.use(this.paths.categorias, routerCategoria);
    this.app.use(this.paths.productos, routerProducto);
    this.app.use(this.paths.usuarios, router);
    this.app.use(this.paths.uploads, routerUploads);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:", this.port);
    });
  }
}

export default Server;
