import express from 'express'
// const express = require('express')
import passport from '../utils/passport.js'
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
   res.json({isAuth: req.isAuthenticated(), user})
 } )

 router.get('/logout', (req, res) => {
  //  req.session.destroy()
   req.logOut()
   res.status(200).end()
   
 } )

 router.post('/login', loginValidate , (req, res) => {
   const user = req.user
   const {passwordHash, ...restUser} = user._doc
   res.json({status: 'ok', user})
   console.log(req.isAuthenticated())
 })

 router.get('/failLogin', (req, res) => {
   res.status(401).json({status: 'error', msg: 'usuario o contraseña incorrectos'})
 })

 router.post('/register', registerValidate, (req, res) => {
   const user = req.user
   res.json({status: 'ok', user})
 })

 router.get('/failRegister', (req, res) => {
   res.status(409).json({status: 'error', msg: 'usuario ya registrado'})
 })



export default router
// module.exports = router>