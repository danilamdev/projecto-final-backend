import { ProductService } from '../services/product.service.js'

class ProductController {
  constructor() {
    this.productService = new ProductService()
    this.createProducts = this.createProducts.bind(this)
  }

  async createProducts(req, res) {
    try {
      const response = await this.productService.createProducts()
      res.status(200).json({ productos: response })
    } catch (error) {
      console.log(error)
    }
  }
}

export { ProductController }