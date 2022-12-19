import path from 'path'
import { v4 as uuidv4 } from 'uuid';

// Estas dons configuracion son para que funcione adecuadamente el path.join()
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const subirArchivo = ( files, extensionesValidas = ["png", "jpg", "jpeg", "gif"], carpeta = '' ) => {

  return new Promise((resolve, reject) => {
    const { archivo } = files; // Archivo que se subio.

    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar la extension
    if (!extensionesValidas.includes(extension)) {
      return reject(`La extension: ${extension} no es permitida - ${extensionesValidas}`)
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    // mv permite mover el archivo a cualquier aprte.
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err)
      }

      resolve( nombreTemp );
    });
  });
};
