import { model } from "mongoose";
import Role from "../models/role.js";
import Usuario from "../models/usuario.js";
import Categoria from "../models/categoria.js";
import Producto from "../models/producto.js";

export const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol '${rol}' no esta registrado en la DB`);
  }
};

export const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya esta registrado`);
  }
};

export const existeUsuarioPorId = async (id) => {
  const existeUsuarioPorId = await Usuario.findById(id);
  if (!existeUsuarioPorId) {
    throw new Error(`El ID no existe`);
  }
};

export const existeCategoriaPorId = async (id) => {
  const existeCategoriaPorId = await Categoria.findById(id);
  if (!existeCategoriaPorId) {
    throw new Error(`El ID no existe`);
  }
};

export const existeProductoPorId = async (id) => {
  const existeProductoPorId = await Producto.findById(id);
  if (!existeProductoPorId) {
    throw new Error(`El ID no existe`);
  }
};

// Validar colecciones permitidas.
export const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

  const incluida = colecciones.includes( coleccion );
  if( !incluida ){
    throw new Error(`La coleccion ${ coleccion } no es permitida - ${ colecciones }`)
  }
  return true;
}