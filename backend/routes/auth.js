import express from 'express'
import passport from '../utils/passport.js'

const router = express.Router()
const loginValidate = passport.authenticate('login', {failureRedirect: '/api/auth/failLogin'})
const registerValidate = passport.authenticate('register', {failureRedirect: '/api/auth/failRegister'})


 router.get('/checkUser', (req, res) => {
   console.log( 'mi session', req.session)

   if(!req.session?.user){
     return res.status(401).json({error: true})
   }
   res.json(req.session)
 } )

 router.get('/logout', (req, res) => {
   req.session.destroy()
   res.status(200).end()
   
 } )

 router.post('/login', loginValidate , (req, res) => {
   const user = req.user

   res.json({status: 'success', user})
 })

 router.get('/failLogin', (req, res) => {
   res.status(401).json({status: 'error', msg: 'usuario o contraseña incorrectos'})
 })

 router.post('/register', registerValidate, (req, res) => {
   const user = req.user
   res.json({status: 'success', user})
 })

 router.get('/failRegister', (req, res) => {
   res.status(409).json({status: 'error', msg: 'usuario ya registrado'})
 })


export default router