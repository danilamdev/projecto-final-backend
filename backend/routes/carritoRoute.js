import express from 'express'
import carritoController from '../controllers/carrito.controller.js'

const router = express.Router()

router.get('/:id/productos', carritoController.getProductFromCart)
router.post('/:id/productos', carritoController.addProductToCart)
router.delete('/:id/productos/:prodId', carritoController.removeProductFromCart)

export default router
