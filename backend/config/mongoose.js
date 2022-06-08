import mongoose from 'mongoose'
import logger from '../utils/logger.js'
// import dotenv from 'dotenv'
// dotenv.config()
// const mongoose = require('mongoose')
;(async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log('mongodb is connected to ', db.connection.host)
    logger.info('conectado a mongodb')
  } catch (error) {
    logger.error('error al conectar a mongodb')
    console.log(error)
  }
})()
