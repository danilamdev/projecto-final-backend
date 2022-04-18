import Producto from "../models/producto.js";
import Carrito from "../models/carrito.js";

class Prod {

  async getAll(){
     const productos = await Producto.find({})
     return productos
  }

  async saveProduct(data){
     const newProd = await Producto.create(data)
     return newProd
  }

  async getById(id){
     const producto = await Producto.find({_id: id})
     return producto
  }

  async removeById(id){
     const response = await Producto.deleteOne({_id: id})
     console.log(response)
  }

  async updateById(id, data){
     const response = await Producto.findOneAndUpdate({_id:id},{...data},{new: true})
  }
}

class carrito {
   async saveCarrito(){
      const cart = new Carrito()
      const newCarrito = await cart.save()

      return newCarrito
   }

   async getCarrito(id){
      const cart = await Carrito.findById(id).populate('productos')

      return cart.productos
   }

   async removeCarrito(id){
      await Carrito.findByIdAndRemove(id)
   }

   async saveProdInCarrito(id, prodId){
      const cart = await Carrito.findById(id)

      cart.productos = cart.productos.concat(prodId)
      cart.save()
   }

   async removeProdInCarrito(id, prodId){
      const cart = await Carrito.findById(id).populate('productos')
      const newCart = cart.productos.filter(p => p.id !== prodId)
      
      cart.productos = newCart
      cart.save()

   }
}

const mongoProduct = new Prod()
const mongoCarrito = new carrito()

export {mongoProduct, mongoCarrito}