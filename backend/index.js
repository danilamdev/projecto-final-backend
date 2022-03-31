import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import productosRouter from './routes/productos.js'
import carritoRouter from './routes/carrito.js'

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)

app.all('*', (req, res) => {
  res.status(501).json({ error: -2, descripcion: `Ruta ${req.originalUrl}, method ${req.method} no inplementada` })
})

app.listen(port, () => {
  console.log(`servidor iniciado en el puerto ${process.env.PORT}`)
})
