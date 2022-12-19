import { response } from "express";
import Categoria from "../models/categoria.js";

// ObtenerCategorias - Paginado - total - populate
export const obtenerCategorias = async (req = request, res = response) => {
  // El limit recibe la cantidad de registros que le mandamos
  const { limite = 5, desde = 0 } = req.query;

  const [total, categorias] = await Promise.all([
    // Aqui podemos ver lo que seria la f total de arriba.
    Categoria.countDocuments({ estado: true }),
    // Aqui podemos ver lo que seria la f categorias de arriba.
    Categoria.find({ estado: true })
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    msg: "get API - controller",
    total,
    categorias,
  });
};

// ObtenerCategoria - populate {}
export const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json(categoria);
};

// Crear categoria
export const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  // Buscamos una categoria con el nombre que le pasamos y se la asignamos a categoriaDB
  const categoriaDB = await Categoria.findOne({ nombre });

  // Si ya existe una categoria con ese nombre mandar un error
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar.
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  // Se crea una categoria usando el modelo
  const categoria = new Categoria(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

// ActualizarCategoria
export const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  // Usuario que actualiza
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json({
    msg: "put API - controller",
    categoria,
  });
};

// BorrarCategoria - estado: false
export const borrarCategoria = async (req, res) => {
  const { id } = req.params;

  // Al poner { new: true } simplemente es para mostrar los cambios hechos sobre el json
  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(categoriaBorrada);
};
