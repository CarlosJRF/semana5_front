import { Link } from "react-router";

export default function Inicio() {
  return (
    <section>
      <h1>Tienda de juegos retro</h1>

      <p>Exploren nuestro catálogo de juegos retro y encuentren su próximo favorito.</p>

      <Link to="/videojuegos">Explorar videojuegos</Link>
    </section>
  );
}
