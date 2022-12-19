import { Schema, model } from 'mongoose'

const CategoriaSchema = Schema({
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
   }
})

// Con este metodo de abajo logramos que no se nos manden
// ni el password ni el __v. Es decir que no lo veremos
// en el postman, pero si en nuestra DB.
CategoriaSchema.methods.toJSON = function(){
   const { __v, estado, ...data } = this.toObject();
   return data
}

export default model( 'Categoria', CategoriaSchema )