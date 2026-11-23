import { useQuery } from "@apollo/client/react";
import { Link, useParams, useSearchParams } from "react-router";
import { OBTENER_VIDEOJUEGO } from "../graphql/operaciones";

export default function DetalleVideojuego() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const simularError = searchParams.get("error") === "graphql";

  const { data, loading, error, refetch } = useQuery(OBTENER_VIDEOJUEGO, {
    variables: { id, simularError },
  });

  const videojuego = data?.videojuego;

  return (
    <section>
      <h1>Detalle del videojuego</h1>

      <p>
        El catálogo se obtuvo mediante REST. Este detalle se consulta mediante
        GraphQL simulado con MSW.
      </p>

      <div className="acciones">
        <Link to="/videojuegos">Volver al catálogo</Link>

        {simularError ? (
          <button onClick={() => setSearchParams({})}>
            Desactivar error simulado
          </button>
        ) : (
          <button onClick={() => setSearchParams({ error: "graphql" })}>
            Simular error GraphQL
          </button>
        )}
      </div>

      {loading && <p role="status">Cargando detalle del videojuego...</p>}

      {error && (
        <div className="error" role="alert">
          <p>{error.message}</p>

          {!simularError && (
            <button onClick={() => refetch()} disabled={loading}>
              Reintentar
            </button>
          )}
        </div>
      )}

      {!loading && !error && !videojuego && (
        <div className="error" role="alert">
          <p>
            No se encontró un videojuego con el identificador {id}. Verifica el
            enlace o vuelve al catálogo.
          </p>

          <Link to="/videojuegos">Volver al catálogo</Link>
        </div>
      )}

      {!loading && !error && videojuego && (
        <article className="tarjeta detalle">
          <h2>{videojuego.nombre}</h2>
          <p>{videojuego.descripcion}</p>

          <dl>
            <dt>Plataforma</dt>
            <dd>{videojuego.plataforma}</dd>

            <dt>Categoría</dt>
            <dd>{videojuego.categoria}</dd>

            <dt>Precio</dt>
            <dd>${videojuego.precio}</dd>
          </dl>
        </article>
      )}
    </section>
  );
}
