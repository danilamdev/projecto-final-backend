import { useEffect, useContext } from "react";
import { getProductos } from "../../services/productos";
import { productContext } from "../../context/productContext";
import ListOfProducts from "../../components/listofProducts";
import Form from "../../components/form";
import Carrito from "../../components/carrito";
import Chat from "../../components/chat";

export default function Home() {
  const { productos, setProductos } = useContext(productContext);

  useEffect(() => {
    getProductos().then((productos) => setProductos(productos));
  }, [setProductos]);

  return (
    <>
      <Chat />
      <Carrito />
      <h1 className="text-4xl text-center font-bold w-3/4 m-auto py-24 md:w-[550px]">
        Ecomerce CoderHouse BACKEND
      </h1>
      {productos.length === 0 
        ? (<div className="w-full h-96 border grid place-content-center">
          <h1 className="text-5xl text-pink-400 font-bold">loading...</h1>
        </div>)
        : (
          <ListOfProducts productos={productos} />

        )
      }
      <Form />
    </>
  );
}
