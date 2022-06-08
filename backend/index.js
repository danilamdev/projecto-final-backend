import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import './config/mongoose.js'
import session from 'express-session'
// const session = require('express-session')
import passport from 'passport'
import mongoStore from 'connect-mongo'
import notFound from './middlewares/notFound.js'
import productosRouter from './routes/productos.js'
import carritoRouter from './routes/carrito.js'
import authRoutes from './routes/auth.js'
// const authRoutes = require('./routes/auth.js')
import infoRoute from './routes/info.js'
import randomRoute from './routes/randomRoute.js'
import './dbControllers/createTable.js'
import RESPONSE_MSG from './utils/socket_responses.js'
import mensajes from './dbControllers/sqliteControllers.js'
import mockProductRoutes from './routes/productos-test.js'
import { ARGS } from './utils/minimist.js'
import logger from './utils/logger.js'
import compression from 'compression'

// const dotenv = require('dotenv')
// const express = require('express')
// const http = require('http')
// const infoRoute = require('./routes/info.js')
// const randomRoute = require('./routes/randomRoute.js')
// const notFound = require('./middlewares/notFound.js')


const app = express()
const serverHttp = http.createServer(app)
const PORT = process.argv[2]  || 8080
export const io = new Server(serverHttp)


// ---INICIALIZACION DE SOCKET.IO Y MENSAJES---

io.on('connection', async (socket) => {
  console.log('** USUARIO CONECTADO **')
  logger.info('Usuario conectado')

  socket.on('initial-client', (data) => {
    mensajes.guardarMensaje(RESPONSE_MSG['initial'])
    logger.info('Mensaje inicial enviado')
    socket.emit('initial-server', RESPONSE_MSG['initial'])
  })

  socket.on('msg-client0', async (data) => {
    const { message } = data
    logger.info(`Mensaje recibido: ${message}`)
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
    logger.info(`Mensaje recibido: ${message}`)
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
    logger.info(`Mensaje recibido: ${data.message}`)
    socket.emit('msg-server', RESPONSE_MSG['final'])
    await mensajes.guardarMensaje(RESPONSE_MSG['final'])
  })

  socket.on('disconnect', () => {
    console.log('Usuario DESCONECTO')
    logger.info('Usuario desconectado')
    mensajes.getMensajes()
  })
})

// -- MIDDLEWARES

app.use(compression())
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
app.use('/info', infoRoute)
app.use('/api/random', randomRoute)


app.get('/', (req, res) => {
  res.send(`
  <h1>estamos en Server-master en puerto ${process.argv[2] || PORT}</h1>
  <a href="/info">ir a info</a><br />
  <h5>balance de carga en /api/random en puertos 8082, 8083 ,8084, 8085</h5>
  <a href="/api/random">ir a api/random</a>
  `)
})

// --Ruta mock productos
app.use('/api/productos-test', mockProductRoutes)

// --404 not Found
app.use(notFound)

serverHttp.listen(PORT, () => {
  console.log(`servidor iniciado en el puerto ${PORT}`)
  logger.info(`Servidor Escuchando Y Listo en http://localhost:${PORT}`)
})
