import Jwt from "jsonwebtoken";

export const generarJwT = ( uid = '' ) => {
   return new Promise( ( resolve, reject ) =>{
      const payload = { uid };

      Jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
         expiresIn: '4h'
      }, ( err, token ) => {
         if( err ){
            console.log(err)
            reject('No se pudo generar el token')
         } else {
            resolve( token );
         }
      })
   })
}
