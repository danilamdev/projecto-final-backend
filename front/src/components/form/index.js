import { useState, useContext } from "react";
import { createProduct } from "../../services/productos";
import { productContext } from "../../context/productContext";

export default function Form() {
  const initialValues = {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    codigo: "",
    foto: "",
  };
  const [newProduct, setNewProduct] = useState(initialValues);
  const [message, setMessage] = useState({ show: false, status: "" });
  const { productos, setProductos } = useContext(productContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNewProduct(initialValues);

    await createProduct(newProduct)
      .then((res) => {
        setMessage({ show: true, status: res.status });
        setTimeout(() => {
          setMessage({ show: false, status: "" });
        }, 5000);

        setProductos( prev => [...prev, res.nuevoProducto]);

        console.log('productos', productos)
      });
  };

  return (
    <section className="w-11/12 max-w-lg mx-auto shadow-lg shadow-pink-300/50 px-12 py-10 mt-10 mb-12 bg-white rounded-lg">
      <h4 className="font-bold text-2xl my-5s uppercase">Formulario</h4>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 py-5 relative"
      >
        {message.show && (
          <p className="text-lime-600 font-normal  border-lime-500 text-md fixed top-16 right-16 bg-lime-100 rounded-xl px-4 py-3 shadow-xl animate-toastyAnim">
            {message.status}
          </p>
        )}
        <div className="flex flex-col">
          <label htmlFor="nombre" className="text-gray-600">
            nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            onChange={handleChange}
            value={newProduct.nombre}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="descripcion" className="text-gray-600">
            descripcion
          </label>
          <input
            type="text"
            name="descripcion"
            id="descripcion"
            onChange={handleChange}
            value={newProduct.descripcion}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="precio" className="text-gray-600">
            precio
          </label>
          <input
            type="text"
            name="precio"
            id="precio"
            onChange={handleChange}
            value={newProduct.precio}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="text-gray-600">
            stock
          </label>
          <input
            type="text"
            name="stock"
            id="stock"
            onChange={handleChange}
            value={newProduct.stock}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="codigo" className="text-gray-600">
            codigo
          </label>
          <input
            type="text"
            name="codigo"
            id="codigo"
            onChange={handleChange}
            value={newProduct.codigo}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <div className="flex flex-col mb-10">
          <label htmlFor="foto" className="text-gray-600">
            foto
          </label>
          <input
            type="text"
            name="foto"
            id="foto"
            onChange={handleChange}
            value={newProduct.foto}
            className="p-2 rounded-sm bg-slate-100 focus:outline-1 focus:outline-pink-400/40"
          />
        </div>
        <button className="bg-pink-600 text-white font-semibold text-base py-3 rounded-md hover:bg-pink-500">
          Crear producto
        </button>
      </form>
    </section>
  );
}
