import { model } from "mongoose";
import Role from "../models/role.js";
import Usuario from "../models/usuario.js"

export const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol '${rol}' no esta registrado en la DB`);
  }
};

export const emailExiste = async(correo = '') => {
  const existeEmail = await Usuario.findOne({ correo });
  if(existeEmail){
   throw new Error(`El correo: ${correo} ya esta registrado`)
  }
}

export const existeUsuarioPorId = async( id ) => {
  const existeUsuarioPorId = await Usuario.findById( id );
  if(!existeUsuarioPorId){
   throw new Error(`El ID no existe`);
  }
}
