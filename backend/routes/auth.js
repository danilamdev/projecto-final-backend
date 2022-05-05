import express from 'express'

const router = express.Router()

router.post('/login',  (req, res) => {
   const {username, pass} = req.body
   req.session.user = {username, pass}
 
   res.status(201).json(req.session)
   console.log(req.session)
 })

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


export default router