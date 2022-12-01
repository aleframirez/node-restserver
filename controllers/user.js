import { response, request } from "express";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

export const getUsuarios = async (req = request, res = response) => {
  // El limit recibe la cantidad de registros que le mandamos
  const { limite = 5, desde = 0 } = req.query;

  // const usuarios = await Usuario.find({ estado: true })
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments({ estado: true });

  // Con el Promise.all lo que logramos es tener un tiempo de 
  // ejecuacion de las funciones que llevan un await mucho mas
  // rapido, ya que ejecuta las f de manera simultanea. 
  // Para usarlo debes poner el contenido que llevaria
  // una f normal de await dentro de un arreglo en el Promise.all
  // de esta manera, el programa ejecutara a todas las f de una
  // sola vez ahorrandonos mucho tiempo.

  const [ total, usuarios ] = await Promise.all([
    // Aqui podemos ver lo que seria la f total de arriba.
    Usuario.countDocuments({ estado: true }),
    // Aqui podemos ver lo que seria la f usuarios de arriba.
    Usuario.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limite))
  ])

  res.json({
    msg: "get API - controller",
    total,
    usuarios,
  });
};

export const putUsuarios = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // Validar contra DB
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API - controller",
    usuario,
  });
};

export const postUsuarios = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contrasena
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  //Guardar en BD

  await usuario.save();

  res.json({
    msg: "post API - controller",
    usuario,
  });
};

export const deleteUsuarios = async(req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate( id, {estado: false }, { new: true });

  res.json({
    usuario,
  });
};
