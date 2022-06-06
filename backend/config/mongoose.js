import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
// const mongoose = require('mongoose')
;(async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log('mongodb is connected to ', db.connection.host)
  } catch (error) {
    console.log(error)
  }
})()
