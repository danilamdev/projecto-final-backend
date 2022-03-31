import express from 'express'
import { carritoController } from '../controllers/classController.js'
import { ADMIN } from './productos.js'

const router = express.Router()

router.get('/:id/productos', async (req, res) => {
  const { id } = req.params
  const productos = await carritoController.getCarrito(Number(id))
  productos ? res.json({ productos }) : res.status(404).json({ status: 'carrito no encontrado' })
})

router.post('/', async (req, res) => {
  const result = await carritoController.saveCarrito()
  res.json({ id_carrito: result })
})

router.post('/:id/productos', async (req, res) => {
  const { id } = req.params
  const { body } = req
  await carritoController.saveProdInCarrito(Number(id), body)
  res.json({ status: 'producto agregado a carrito' })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await carritoController.removeCarrito(Number(id))
  res.json({ status: 'carrito eliminado' })
})

router.delete('/:id/productos/:id_prod', async (req, res) => {
  const { id, id_prod } = req.params
  const resultado = await carritoController.removeProdInCarrito(Number(id), Number(id_prod))

  if (!resultado) return res.status(404).json({ status: 'id no encontrado' })

  res.json({ status: 'producto eliminado del carrito' })
})

export default router
