import { json, response } from "express";
import Usuario from '../models/usuario.js'
import bcrypt from "bcrypt";
import { generarJwT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";


export const login = async(req, res = response) => {
   const { correo, password} = req.body;

   try {
      // Verificar si el correo existe
      const usuario = await Usuario.findOne({ correo })
      if(!usuario){
         return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
         })
      }

      // Si el usuario esta activo
      if(!usuario.estado){
         return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: false'
         })
      }

      // Verificar la contrasena
      const validPassword = bcrypt.compareSync(password, usuario.password);
      if(!validPassword){
         return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password'
         })
      }
      
      //Generar JwT
      const token = await generarJwT( usuario.id );

      res.json({
         msg: 'Login ok',
         usuario,
         token
      })      
   } catch (error) {
      console.log(error)
      return res.status(500).json({
         msg: 'Hable con el administrador'
      })
   }

}

export const googleSignIn = async(req, res = response) => {

   const { id_token } = req.body;

   try {

      const { nombre, correo, img } = await googleVerify( id_token )

      let usuario = await Usuario.findOne({ correo });

      if( !usuario ){
         // Tengo que crearlo
         const data = {
            nombre,
            correo,
            password: ':D',
            img,
            rol: 'USER_ROLE',
            google: true
         };

         usuario = new Usuario( data )
         await usuario.save()
      }

      //Si el usuario en DB
      if( !usuario.estado){
         return res.status(401).json({
            msg: 'Hable con el administrador, usuario bloqueado'
         })
      }

      //Generar el JWT
      const token = await generarJwT( usuario.id );

      res.json({
         usuario,
         token
      })

   } catch (error) {
      json.status(400).json({
         ok: false,
         msg: 'El token no se pudo verificar'
      })
   }


}