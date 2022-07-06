import ProdDAO from '../services/DAO/producto.factory.js'
import logger from '../utils/logger.js'

let producto = ProdDAO.initInstance()

const getProducts = async (req, res) => {
  const { id } = req.params
  const productos = await producto.getAll()
  
  if (typeof id === 'undefined') {
    return res.json(productos)
  }

  const product = await producto.getById(id)
  if (product.length === 0) return res.status(404).json({ error: 'no se encontro el producto...' })

  return res.json(product)
}

const createProduct = async (req, res) => {
  const { body } = req
  const nuevoProducto = await producto.saveProduct(body)
  
  res.json({ status: 'producto agregado', nuevoProducto })
  logger.info('POST api/productos producto agregado')
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  await producto.removeById(id)

  res.json({ status: 'producto eliminado' })
  logger.info('DELETE api/productos producto eliminado')
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  const { body } = req
  
  await producto.updateById(id, body)
  res.json({ status: 'updated' })
  logger.info('PUT api/productos producto actualizado')
}

export default {getProducts, createProduct, deleteProduct, updateProduct}