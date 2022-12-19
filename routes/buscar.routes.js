import { Router } from "express";
import { check } from "express-validator";

import { buscar } from "../controllers/buscar.js";

export const routerBusqueda = Router()

routerBusqueda.get('/:coleccion/:termino', [
], buscar );
