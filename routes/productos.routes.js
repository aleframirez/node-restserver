import { Router } from "express";
import { check } from "express-validator";

import {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProducto,
  obtenerProductos,
} from "../controllers/productos.js";

import {
  existeProductoPorId,
  existeCategoriaPorId,
} from "../helpers/db-validators.js";

import {
  validarCampos,
  validarJwT,
  esAdminRole,
} from "../middlewares/index.js";

export const routerProducto = Router();

// Obtener todas las categorias - publico
routerProducto.get("/", obtenerProductos);

// Obtener una categoria por id - publico
routerProducto.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

// Crear una nueva categoria - cualquier persona con un token valido
routerProducto.post(
  "/",
  [
    validarJwT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo valido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

//Actualizar - provado / cualquiera con un token valido
routerProducto.put(
  "/:id",
  [
    validarJwT,
   //  check("categoria", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// Borrar una categoria - Admin
routerProducto.delete(
  "/:id",
  [
    validarJwT,
    esAdminRole,
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);
