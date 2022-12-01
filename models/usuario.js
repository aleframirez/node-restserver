//    Modelo de la base de datos
// {
//    nombre,
//    correo,
//    password,
//    img,
//    rol,
//    estado,
//    google
// }

import { Schema, model } from 'mongoose'

const UsuarioSchema = Schema({
   nombre:{
      type: String,
      require: [true, 'El nombre es obligatorio']
   },
   correo:{
      type: String,
      require: [true, 'El correo es obligatorio'],
      unique: true
   },
   password:{
      type: String,
      require: [true, 'El password es obligatorio']
   },
   img:{
      type: String,
   },
   rol:{
      type: String,
      require: true,
      default: "USER_ROL",
      enum: ['ADMIN_ROLE', 'USER_ROLE']
   },
   estado:{
      type: Boolean,
      default: true
   },
   google:{
      type: Boolean,
      default: false
   }
});

// Con este metodo de abajo logramos que no se nos manden
// ni el password ni el __v. Es decir que no lo veremos
// en el postman, pero si en nuestra DB.
UsuarioSchema.methods.toJSON = function(){
   const { __v, password, _id, ...usuario } = this.toObject();
   usuario.uid = _id
   return usuario
}

export default model( 'Usuario', UsuarioSchema )
