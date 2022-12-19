// Codigo sacado y modificado de la siguiente pagina:
// https://github.com/richardgirges/express-fileupload/blob/master/example/server.js

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import * as cloudinary from 'cloudinary'
cloudinary.config({ 
  cloud_name: 'dgnco8bh4', 
  api_key: '348641225793799', 
  api_secret: '7J3CNxOzo-gQk1NxqEmKSRAxu-E',
  secure: true
});

const NAME = process.env.CLOUDINARY_NAME
console.log(NAME)

import { response } from "express";
import { subirArchivo } from "../helpers/index.js";

import Usuario from "../models/usuario.js";
import Producto from "../models/producto.js";

export const cargarArchivo = async (req, res = response) => {
  try {
    // Al poner el undefined va a usar el argumento por defecto de lo que estamos subiendo.
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ msg });
  }
};

export const actualizarArchivo = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuarios con el id: ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto." });
  }

  // Limpiar img previas
  if( modelo.img ){
    // Hay que borrar la imagen del servidor.
    const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
    if( fs.existsSync( pathImagen )){
      fs.unlinkSync( pathImagen );
    }
  }
  

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};

export const mostrarImagen = async(req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuarios con el id: ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto." });
  }

  // Limpiar img previas
  if( modelo.img ){
    // Hay que borrar la imagen del servidor.
    const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
    if( fs.existsSync( pathImagen )){
      return res.sendFile( pathImagen )
    }
  }

  const pathImagen = path.join( __dirname, '../assets/no-image.jpg')
  res.sendFile( pathImagen )

}

export const actualizarArchivoCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuarios con el id: ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto." });
  }

  // Limpiar img previas
  if( modelo.img ){
    // Tomamos la url de la img y la separamos
    const nombreArr = modelo.img.split('/');
    // Agarramos el ultimo path que es el id de la img
    const nombre = nombreArr[ nombreArr.length -1 ];
    // Por ultimo obtenemos el id publici de la img sin la extension de archivo.
    const [ public_id ] = nombre.split('.');
    // Borramos de cloudinary.
    cloudinary.uploader.destroy( public_id );
  }
  
  const { tempFilePath } = req.files.archivo
  // De todo lo que viene solo vamos a neecesitar el secure URL
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath, {folder:`RestServer NodeJs/${coleccion}`} );
  modelo.img = secure_url;

  await modelo.save();

  res.json(modelo);
};
