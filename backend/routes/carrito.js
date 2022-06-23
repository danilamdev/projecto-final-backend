import express from 'express'
import { carritoController } from '../fileControllers/classController.js'
import { carritoService } from '../dbControllers/mysqlController.js'
import { mongoCarrito } from '../dbControllers/mongoController.js'

const router = express.Router()

router.get('/:id/productos', async (req, res) => {
  const { id } = req.params
  const productos = await mongoCarrito.getCarrito(id)
  productos ? res.json({ productos }) : res.status(404).json({ status: 'carrito no encontrado' })
})

router.post('/', async (req, res) => {

  const result = await mongoCarrito.saveCarrito()
  res.json({ id_carrito: result.id })
})

router.post('/:id/productos', async (req, res) => {
  const { id } = req.params
  const { _id: productId} = req.body

  await mongoCarrito.saveProdInCarrito(id, productId)
  res.json({ status: 'producto agregado a carrito' })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await mongoCarrito.removeCarrito(id)
  res.json({ status: 'carrito eliminado' })
})

router.delete('/:id/productos/:prodId', async (req, res) => {
  const { id, prodId } = req.params
  const {productos} = await mongoCarrito.removeProdInCarrito(id, prodId)
  const carrito = await mongoCarrito.getCarrito(id)
  console.log(carrito)

  res.json({ status: 'producto eliminado del carrito', carrito, productos})
})

export default router
