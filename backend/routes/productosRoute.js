import express from 'express'
import productController from '../controllers/productos.controller.js'

const router = express.Router()

router.get('/:id?', productController.getProducts)

router.post('/', productController.createProducts)

router.delete('/:id', productController.deleteProduct)

router.put('/:id', productController.updateProduct)

export default router
