import express from 'express'
import { ARGS } from '../utils/minimist.js'

const router = express.Router()

router.get('/', (req, res) => {
   const procesos = {
      'argumentos': ARGS,
      'carpeta proyecto': process.cwd(),
      'Sistema operativo': process.platform,
      'ID proceso': process.pid,
      'node version': process.version,
      'path ejecucion': process.execPath,
      'memoria': process.memoryUsage().rss
   }

   console.log(procesos)
   res.status(200).json(procesos)
})

export default router