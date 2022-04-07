import express from 'express'
import { productController } from '../controllers/classController.js'
import { productService } from '../dbControllers/mysqlController.js'

const router = express.Router()

export const ADMIN = true

router.get('/:id?', async (req, res) => {
  const { id } = req.params
  const productos = await productService.getAll()

  if (typeof id === 'undefined') {
    return res.json(productos)
    // const fileContent = await productController.getAll()
    // return res.json(fileContent)
  }

  const producto = await productService.getById(Number(id))
  if (producto.length === 0) return res.status(404).json({ error: 'no se encontro el producto...' })
  return res.json(producto)
})

router.post('/', async (req, res) => {
  if (!ADMIN)
    return res
      .status(401)
      .json({
        error: -1,
        description: `ruta ${req.originalUrl} metodo ${req.method} no Autorizado`,
      })
      .end()

  const { body } = req
  const nuevoProducto = await productService.saveProduct(body)
  // const newProduct = await productController.saveProduct(body)

  res.json({ status: 'producto agregado', nuevoProducto })
})

router.delete('/:id', async (req, res) => {
  if (!ADMIN)
    return res
      .status(401)
      .json({
        error: -1,
        description: `ruta ${req.originalUrl} metodo ${req.method} no Autorizado`,
      })
      .end()

  const { id } = req.params
  await productService.removeById(Number(id))

  res.json({ status: 'producto eliminado' })
})

router.put('/:id', async (req, res) => {
  if (!ADMIN)
    return res
      .status(401)
      .json({
        error: -1,
        description: `ruta ${req.originalUrl} metodo ${req.method} no Autorizado`,
      })
      .end()

  const { id } = req.params
  const { body } = req

  await productService.updateById(Number(id), body)
  res.json({ status: 'updated' })
})

export default router
