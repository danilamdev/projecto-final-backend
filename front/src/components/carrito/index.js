import { useState, useEffect, useContext } from "react";
import { productContext } from "../../context/productContext";
import { getCarritoById } from "../../services/carrito";

export default function Carrito() {
  const { carrito, setCarrito } = useContext(productContext);
  const [message, setMessage] = useState({ show: false, status: "" });

  console.log("CARRITO", carrito);

  useEffect(() => {
    console.log("carritoEffect");
    getCarritoById().then((res) => {
      setCarrito(res.productos.length);
      console.log("CARRITO", res.productos.length);

      setMessage({ show: true, status: "en el status" });
      setTimeout(() => {
        setMessage({ show: false, status: "" });
      }, 5000);
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
