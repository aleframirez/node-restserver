import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from '../middlewares/validar-campos.js'
import { emailExiste, esRolValido, existeUsuarioPorId } from '../helpers/db-validators.js'

import { 
  deleteUsuarios, 
  getUsuarios, 
  postUsuarios, 
  putUsuarios 
} from "../controllers/user.js";

export const router = Router();

router.get("/", getUsuarios);

router.put("/:id", [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  check('rol').custom( esRolValido ),
  validarCampos
], putUsuarios);

router.post("/", [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe contener minimo 6 letras').isLength({ min: 6 }),
  check('correo', 'Correo invalido').isEmail(),
  check('correo').custom( emailExiste ),
  // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom( esRolValido ),
  validarCampos
], postUsuarios);

router.delete("/:id", [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
], deleteUsuarios);
