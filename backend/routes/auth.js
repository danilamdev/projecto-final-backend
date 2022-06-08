import express from 'express'
// const express = require('express')
import passport from '../utils/passport.js'
import logger from '../utils/logger.js'
// const passport = require('../utils/passport.js')

const router = express.Router()
const loginValidate = passport.authenticate('login', {failureRedirect: '/api/auth/failLogin'})
const registerValidate = passport.authenticate('register', {failureRedirect: '/api/auth/failRegister'})


 router.get('/checkUser', (req, res) => {
  console.log(req.isAuthenticated())
  //  if(!req.session?.user){
  //    return res.status(401).json({error: true})
  //  }
  const user = req.user
  logger.info('GET /checkUser')
   res.json({isAuth: req.isAuthenticated(), user})
 } )

 router.get('/logout', (req, res) => {
  //  req.session.destroy()
   req.logOut()
   logger.info('GET /logout')
   res.status(200).end()
   
 } )

 router.post('/login', loginValidate , (req, res) => {
   const user = req.user
   const {passwordHash, ...restUser} = user._doc
   res.json({status: 'ok', user})
   logger.info(`POST /login status OK`)
   console.log(req.isAuthenticated())
 })

 router.get('/failLogin', (req, res) => {
   res.status(401).json({status: 'error', msg: 'usuario o contraseña incorrectos'})
   logger.error(`GET /failLogin status error`)
 })

 router.post('/register', registerValidate, (req, res) => {
   const user = req.user
   res.json({status: 'ok', user})
   logger.info(`POST /register status OK`)
 })

 router.get('/failRegister', (req, res) => {
   res.status(409).json({status: 'error', msg: 'usuario ya registrado'})
   logger.error(`GET /failRegister status error`)
 })



export default router
// module.exports = router>