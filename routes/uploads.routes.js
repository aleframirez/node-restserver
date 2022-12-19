import { Router } from "express";
import { check } from "express-validator";
import { actualizarArchivo, actualizarArchivoCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";

import { validarCampos, validarArchivoSubir } from "../middlewares/index.js";

export const routerUploads = Router()

routerUploads.post('/', validarArchivoSubir, cargarArchivo);

routerUploads.put('/:coleccion/:id', [
   validarArchivoSubir,
   check('id', 'El id debe ser de Mongo').isMongoId(),
   check('coleccion').custom( coleccion => coleccionesPermitidas( coleccion , ['usuarios', 'productos'])),
   validarCampos
], actualizarArchivoCloudinary );

routerUploads.get('/:coleccion/:id', [
   check('id', 'El id debe ser de Mongo').isMongoId(),
   check('coleccion').custom( coleccion => coleccionesPermitidas( coleccion , ['usuarios', 'productos'])),
   validarCampos
], mostrarImagen );