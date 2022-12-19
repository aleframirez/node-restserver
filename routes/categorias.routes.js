import { Router } from "express";
import { check } from "express-validator";
import { 
   crearCategoria,
   obtenerCategorias, 
   obtenerCategoria,
   actualizarCategoria,
   borrarCategoria,
} from "../controllers/categorias.js";

import { existeCategoriaPorId, existeUsuarioPorId } from "../helpers/db-validators.js";

import {
   validarCampos,
   validarJwT,
   esAdminRole,
   tieneRol
 } from '../middlewares/index.js'

export const routerCategoria = Router()

// Obtener todas las categorias - publico
routerCategoria.get('/', obtenerCategorias )

// Obtener una categoria por id - publico
routerCategoria.get('/:id', [
   check('id', 'No es un id de Mongo valido').isMongoId(),
   check('id').custom( existeCategoriaPorId ),
   validarCampos
], obtenerCategoria )

// Crear una nueva categoria - cualquier persona con un token valido
routerCategoria.post('/',[ 
   validarJwT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   validarCampos
], crearCategoria)

//Actualizar - provado / cualquiera con un token valido
routerCategoria.put('/:id', [
   validarJwT,
   check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
   check('id').custom( existeCategoriaPorId ),
   validarCampos
], actualizarCategoria)

// Borrar una categoria - Admin
routerCategoria.delete('/:id', [
   validarJwT,
   esAdminRole,
   check('id', 'No es un id de Mongo valido').isMongoId(),
   check('id').custom( existeCategoriaPorId ),
   validarCampos
], borrarCategoria)
