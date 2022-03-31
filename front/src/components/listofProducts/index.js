import Card from "../card/index";
import "./listadeProductos.css";

export default function ListOfProducts({ productos }) {
  console.log("LISTA", productos);
  return (
    <section className="card-container">
      {productos.map((prod) => (
        <Card key={prod.id} producto={prod} />
      ))}
    </section>
  );
}
