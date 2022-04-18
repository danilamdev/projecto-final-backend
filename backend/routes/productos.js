import express from 'express'
// import { productController } from '../fileControllers/classController.js'
// import { productService } from '../dbControllers/mysqlController.js'
import { mongoProduct } from '../dbControllers/mongoController.js'
import { fireStoreProduct } from '../dbControllers/firabaseController.js'

const router = express.Router()

export const ADMIN = true

router.get('/:id?', async (req, res) => {
  const { id } = req.params

  const productos = await mongoProduct.getAll() //--USANDO MONGODB
  // const productos = await fireStoreProduct.getAll() //--USANDO FIRESTORE

  if (typeof id === 'undefined') {
    return res.json(productos)
  }

  const producto = await mongoProduct.getById(id) //--USANDO MONGODB
  // const producto = await fireStoreProduct.getById(id) //--USANDO FIRESTORE
  
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

  const nuevoProducto = await mongoProduct.saveProduct(body)//--USANDO MONGO
  // const nuevoProducto = await fireStoreProduct.saveProduct(body)//--USANDO FIRESTORE

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
  await mongoProduct.removeById(id)//--USANDO MONGO
  // await fireStoreProduct.removeById(id)//--USANDO FIRESTORE

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

  await mongoProduct.updateById(id, body)//--USANDO MONGO
  // await fireStoreProduct.updateById(id, body)//--USANDO FIRESTORE
  res.json({ status: 'updated' })
})



export default router
