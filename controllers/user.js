import { response, request } from 'express'


export const getUsuarios = (req = request, res = response) => {
   const query = req.query

   res.json({
     msg: "get API - controller",
     query
   });
}

export const putUsuarios = (req, res) => {
   const {id} = req.params.id
   res.json({
     msg: "put API - controller",
   });
}

 export const postUsuarios = (req, res) => {
   const {nombre, edad} = req.body

   res.json({
     msg: "post API - controller",
     nombre,
     edad
   });
}

 export const deleteUsuarios = (req, res) => {
   res.json({
     msg: "delete API - controller",
   });
}