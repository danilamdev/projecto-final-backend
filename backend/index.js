import express from 'express'
import cors from 'cors'
import http from 'http'
import 'dotenv/config'
import notFound from './middlewares/notFound.js'
import productosRouter from './routes/productos.js'
import carritoRouter from './routes/carrito.js'
import { Server } from 'socket.io'
import RESPONSE_MSG from './utils/socket.js'

const app = express()
const serverHttp = http.createServer(app)
export const io = new Server(serverHttp)

const port = process.env.PORT || 8080

io.on('connection', async (socket) => {
  console.log('** USUARIO CONECTADO **')

  socket.on('initial-client', (data) => {
    console.log('initialCLIENT,', data)
    socket.emit('initial-server', RESPONSE_MSG['initial'])
  })

  socket.on('msg-client0', (data) => {
    console.log('client0', data)
    const { message } = data
    socket.emit('msg-server', RESPONSE_MSG['00'](message))
  })
  socket.on('msg-client1', (data) => {
    const { message } = data
    if (message === '1') {
      socket.emit('msg-server', RESPONSE_MSG['01'])
    }
    if (message === '2') {
      socket.emit('msg-server', RESPONSE_MSG['02'])
    }
  })

  socket.on('disconnect', () => {
    console.log('Usuario DESCONECTO')
  })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)

app.use(notFound)

serverHttp.listen(port, () => {
  console.log(`servidor iniciado en el puerto ${port}`)
})
