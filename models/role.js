import { Schema, model } from 'mongoose'

const RoleSchema = Schema({
   rol:{
      type: String,
      required: [true, 'El rol es requerido']
   }
})

export default model( 'Role', RoleSchema )