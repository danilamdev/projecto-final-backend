import { productServiceMongo } from '../services/DAO/mongodb/productos.mongo.service.js'
import productosDTO from '../services/DTO/productos.DTO.js'

export const resolvers = {
  hello: () => {
    return 'Hello world!'
  },
  getAllProducts: async () => {
    const productos = await productServiceMongo.getAll()
    const formatedProducts = productos.map(p => productosDTO(p))
    return formatedProducts
  }
}