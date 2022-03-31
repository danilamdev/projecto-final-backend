import express from 'express'
import { productController } from '../controllers/classController.js'

const router = express.Router()

export const ADMIN = true

router.get('/:id?', async (req, res) => {
  const { id } = req.params

  if (typeof id === 'undefined') {
    const fileContent = await productController.getAll()
    return res.json(fileContent)
  }

  const fileContent = await productController.getById(Number(id))
  return res.json(fileContent)
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
  const newProduct = await productController.saveProduct(body)

  res.json({ status: 'producto agregado', newProduct })
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
  await productController.removeById(Number(id))

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

  await productController.updateById(Number(id), body)
  res.json({ status: 'updated' })
})

export default router
