import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import './config/mongoose.js'
import session from 'express-session'
import passport from 'passport'
import mongoStore from 'connect-mongo'
import notFound from './middlewares/notFound.js'
import productosRouter from './routes/productos.js'
import carritoRouter from './routes/carrito.js'
import authRoutes from './routes/auth.js'
import './dbControllers/createTable.js'
import RESPONSE_MSG from './utils/socket_responses.js'
import mensajes from './dbControllers/sqliteControllers.js'
import mockProductRoutes from './routes/productos-test.js'

const app = express()
const serverHttp = http.createServer(app)
export const io = new Server(serverHttp)

const port = process.env.PORT || 8080

// ---INICIALIZACION DE SOCKET.IO Y MENSAJES---

io.on('connection', async (socket) => {
  console.log('** USUARIO CONECTADO **')

  socket.on('initial-client', (data) => {
    mensajes.guardarMensaje(RESPONSE_MSG['initial'])

    socket.emit('initial-server', RESPONSE_MSG['initial'])
  })

  socket.on('msg-client0', async (data) => {
    const { message } = data
    await mensajes.guardarMensaje(data)
    await mensajes.guardarMensaje(RESPONSE_MSG['00']())

    socket.emit('msg-server', RESPONSE_MSG['00'](message))
  })

  socket.on('msg-client1', async (data) => {
    await mensajes.guardarMensaje(data)
    const { message } = data

    if (message === '1') {
      socket.emit('msg-server', RESPONSE_MSG['01'])
      await mensajes.guardarMensaje(RESPONSE_MSG['01'])
    }
    if (message === '2') {
      socket.emit('msg-server', RESPONSE_MSG['02'])
      await mensajes.guardarMensaje(RESPONSE_MSG['02'])
    }
    if (message !== '1' && message !== '2') {
      socket.emit('msg-server', RESPONSE_MSG['wrong'])
      await mensajes.guardarMensaje(RESPONSE_MSG['wrong'])
    }
  })
  socket.on('msg-client2', async (data) => {
    await mensajes.guardarMensaje(data)

    const { message } = data
    if (message === '1') {
      socket.emit('msg-server', RESPONSE_MSG['01'])
      await mensajes.guardarMensaje(RESPONSE_MSG['01'])
    }
    if (message === '2') {
      socket.emit('msg-server', RESPONSE_MSG['02'])
      await mensajes.guardarMensaje(RESPONSE_MSG['02'])
    }
    if (message !== '1' && message !== '2') {
      socket.emit('msg-server', RESPONSE_MSG['wrong'])
      await mensajes.guardarMensaje(RESPONSE_MSG['wrong'])
    }
  })
  socket.on('msg-client3', async (data) => {
    await mensajes.guardarMensaje(data)

    socket.emit('msg-server', RESPONSE_MSG['final'])
    await mensajes.guardarMensaje(RESPONSE_MSG['final'])
  })

  socket.on('disconnect', () => {
    console.log('Usuario DESCONECTO')
    mensajes.getMensajes()
  })
})

// -- MIDDLEWARES

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(session({
  secret: '123456',
  store: mongoStore.create({ 
    mongoUrl: process.env.MONGO_URI
  }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 10 * 1000
  }
}))
app.use(passport.initialize())
app.use(passport.session())

// --RUTAS API

app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)
app.use('/api/auth', authRoutes)


// --Ruta mock productos
app.use('/api/productos-test', mockProductRoutes)

// --404 not Found
app.use(notFound)

serverHttp.listen(port, () => {
  console.log(`servidor iniciado en el puerto ${port}`)
})
