import { useContext } from "react";
import { productContext } from "../../context/productContext";
import { addProductToCart, getCarritoById } from "../../services/carrito";
import "./card.css";

export default function Card({ producto }) {
  const { setCarrito } = useContext(productContext);

  const addProduct = async () => {
    console.log(producto);
    await addProductToCart(producto);
    const result = await getCarritoById();

    setCarrito(result.productos.length);
  };

  return (
    <>
      <div className="card pb-8 rounded-xl">
        <img src="/placeholder.png" alt="placeholder" />
        <h3 className="font-bold text-center text-lg mb-2">
          {producto.nombre}
        </h3>
        <p className="text-center text-sm px-5 mb-7">
          {producto.descripcion} Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Ex eligendi doloribus aliquid sequi, a animi.
        </p>
        <p className="text-center font-bold text-3xl">{`$${producto.precio}`}</p>
        <button
          onClick={addProduct}
          className="w-1/2 bg-black text-white rounded-xl font-bold py-3 mt-10 mx-auto block scale-90 active:scale-[.87] active:transition-transform"
        >
          Add to Card
        </button>
      </div>
    </>
  );
}
