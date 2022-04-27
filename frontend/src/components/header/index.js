import { Link } from "react-router-dom";
import Carrito from "../carrito";

export default function Header() {
  return (
    <header className="bg-white shadow-sm w-full">
      <div className="flex justify-between items-center w-5/6 m-auto max-w-screen-lg">
        <Link to={"/"}>
          <h2 className="text-xl tracking-tighter pb-2">
            <span className="text-4xl font-bold text-pink-500">E</span>
            commerce
          </h2>
        </Link>
        <div className="flex items-center">
          <Link to={"/login"}>
            <p className="relative after:absolute after:-inset-3 after:border-b-2 after:border-pink-300 after:hidden hover:after:block">
              Login
            </p>
          </Link>
          <Link to={"/cart"}>
            <Carrito />
          </Link>
        </div>
      </div>
    </header>
  );
}
