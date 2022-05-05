import { useEffect, useContext } from "react";
import { getProductos } from "../../services/productos";
import { productContext } from "../../context/productContext";
import ListOfProducts from "../../components/listofProducts";
import Form from "../../components/form";
import Chat from "../../components/chat";
import { Link } from "react-router-dom";
// import { useUser } from "../../context/userContext";

export default function Home() {
  const { productos, setProductos } = useContext(productContext);
  // const {user} = useUser()

  useEffect(() => {
    getProductos().then((productos) => setProductos(productos));
  }, [setProductos]);


  return (
    <>
      <Chat />
      <h1 className="text-4xl text-center font-bold w-3/4 m-auto py-24 md:w-[550px]">
        Ecomerce CoderHouse BACKEND
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <Link to={"/mock"}>
          <button className="border border-slate-400 mx-auto block p-2 mb-24">
            mocks productos
          </button>
        </Link>
      </div>
      {productos.length === 0 ? (
        <div className="w-full h-96 border grid place-content-center">
          <h1 className="text-5xl text-pink-400 font-bold">loading...</h1>
        </div>
      ) : (
        <ListOfProducts productos={productos} />
      )}
      <Form />
    </>
  );
}
