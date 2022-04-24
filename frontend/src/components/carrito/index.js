import { useEffect, useContext } from "react";
import { productContext } from "../../context/productContext";
import { getCarritoById } from "../../services/carrito";

export default function Carrito() {
  const { carrito, setCarrito } = useContext(productContext);
 

  useEffect(() => {
    getCarritoById().then((res) => {
      setCarrito(res.productos.length);
    });
  }, []);

  return (
    <div className="pt-8 relative ">
      <div className="w-48 h-4 ml-auto mr-5 relative scale-75">
        {carrito >= 1 ? (
          <p className="absolute scale-50 -top-4 -right-5 bg-rose-400 w-12 h-12 grid place-content-center text-white font-bold rounded-full text-3xl">
            {carrito}
          </p>
        ) : null}

       

        <img src="/cart.svg" alt="cart" className="w-12 m-0 ml-auto" />
      </div>
    </div>
  );
}
