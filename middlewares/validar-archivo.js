import { response } from "express";

export const validarArchivoSubir = (req, res = response, next) => {
  // Si en la request no viene la propiedad files mandar un status 400
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      msg: "No hay archivos para subir - validarArchivoSubir",
    });
  }

  next();
};
