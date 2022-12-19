import { Schema, model } from 'mongoose'

const ProductoSchema = Schema({
   nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      unique: true
   },
   estado: {
      type: Boolean,
      default: true,
      required: true
   },
   // Para saber que usuario lo creo.⬇⬇
   usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
   },
   precio: {
      type: Number,
      default: 0
   },
   categoria: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true
   },
   descripcion: {
      type: String,
   },
   disponible: {
      type: Boolean,
      default: true
   },
   img: {
      type: String
   }
})

// Con este metodo de abajo logramos que no se nos manden
// ni el password ni el __v. Es decir que no lo veremos
// en el postman, pero si en nuestra DB.
ProductoSchema.methods.toJSON = function(){
   const { __v, estado, ...data } = this.toObject();
   return data
}

export default model( 'Producto', ProductoSchema )