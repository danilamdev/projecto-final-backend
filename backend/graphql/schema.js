import { buildSchema } from 'graphql'

const typeDefs = buildSchema(`
  type Query {
    hello: String
    getAllProducts: [Producto]
  }

  type Producto {
    id: ID
    nombre: String
    descripcion: String
    codigo: String
    foto: String
    precio: String
    stock: String
    createdAt: String
  }
`)

export default typeDefs