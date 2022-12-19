import { response } from "express";
import Producto from "../models/producto.js";

// ObtenerCategorias - Paginado - total - populate
export const obtenerProductos = async (req = request, res = response) => {
  // El limit recibe la cantidad de registros que le mandamos
  const { limite = 5, desde = 0 } = req.query;

  const [total, productos] = await Promise.all([
    // Aqui podemos ver lo que seria la f total de arriba.
    Producto.countDocuments({ estado: true }),
    // Aqui podemos ver lo que seria la f productos de arriba.
    Producto.find({ estado: true })
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    msg: "get API - controller",
    total,
    productos,
  });
};


// ObtenerCategoria - populate {}
export const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
                                 .populate("usuario", "nombre")
                                 .populate("categoria", "nombre");
  res.json(producto);
};


// Crear categoria
export const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  // Buscamos una categoria con el nombre que le pasamos y se la asignamos a categoriaDB
  const productoDB = await Producto.findOne({ nombre: body.nombre });

  // Si ya existe una categoria con ese nombre mandar un error
  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar.
  const data = {
   ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  // Se crea una categoria usando el modelo
  const producto = new Producto(data);

  // Guardar DB
  await producto.save();

  res.status(201).json(producto);
};


// ActualizarCategoria
export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if( data.nombre ){
     data.nombre = data.nombre.toUpperCase();
  }
  // Usuario que actualiza
  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json({
    msg: "put API - controller",
    producto
  });
};


// BorrarCategoria - estado: false
export const borrarProducto = async (req, res) => {
  const { id } = req.params;

  // Al poner { new: true } simplemente es para mostrar los cambios hechos sobre el json
  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(productoBorrado);
};
