import { productServiceMongo } from "./mongodb/productos.mongo.service.js"
import { productServiceMysql } from "./mysql/productos.mysql.service.js"
import minimist from "minimist"

const argv = minimist(process.argv.slice(2))
const { db } = argv || 'mongodb'

const SELECT_DB = {
  'mongodb': productServiceMongo,
  'mysql': productServiceMysql
}
let instance = SELECT_DB[db]

export default class ProdDAO {
  static initInstance() {
    return instance
  }
}