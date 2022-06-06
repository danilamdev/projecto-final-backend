import express from 'express'
// const express = require('express')
import {fork} from 'child_process'
// const {fork} = require('child_process')

const router = express.Router()

let calculo = fork('./utils/random.js')

router.get('/', (req, res)=> {
   const {cantidad = 1000000} = req.query

   calculo.on('message', resultado => {
      res.send(`
         <h1>process ${process.pid} proxy nginx | ${process.argv[2] || ''}</h1>
         <pre>${JSON.stringify(resultado, null, 2)}</pre>
      `)
      calculo.kill()
      calculo = fork('./utils/random.js')
   })
 
   calculo.send(cantidad,(err)=> {
      console.log('err', err)
   })
})

export default router