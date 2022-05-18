import express from 'express'
import {fork} from 'child_process'

const router = express.Router()
let calculo = fork('./utils/random.js')

router.get('/', (req, res)=> {
   const {cantidad = 100000000} = req.query
   
   
   calculo.on('message', resultado => {
      console.log('calculo on', resultado)
      res.status(200).json(resultado)
      calculo.kill()
      calculo = fork('./utils/random.js')
   })
 
   calculo.send(cantidad,(err)=> {
      console.log('err', err)
   })

   
})

export default router