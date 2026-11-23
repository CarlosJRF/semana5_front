import { Link } from "react-router";

export default function Videojuegos({
  videojuegos,
  cargando,
  error,
  cargarVideoJuegos,
}) {
  return (
    <section>
      <h1>Videojuegos retro</h1>

      <p>Los videojuegos se consultan mediante una petición al servicio REST.</p>

      <div className="acciones">
        <button onClick={() => cargarVideoJuegos()} disabled={cargando}>
          Actualizar videojuegos
        </button>

        <button onClick={() => cargarVideoJuegos("404")} disabled={cargando}>
          Simular error 404
        </button>

        <button onClick={() => cargarVideoJuegos("500")} disabled={cargando}>
          Simular error 500
        </button>
      </div>

      {cargando && <p role="status">Cargando videojuegos...</p>}

      {error && (
        <div className="error" role="alert">
          <p>{error}</p>

          <button onClick={() => cargarVideoJuegos()} disabled={cargando}>
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && videojuegos.length === 0 && (
        <p>No hay videojuegos disponibles por el momento.</p>
      )}

      {!cargando && error && videojuegos.length > 0 && (
        <p>Mientras tanto, pueden revisar los últimos videojuegos cargados.</p>
      )}

      {!cargando && videojuegos.length > 0 && (
        <div className="videojuegos">
          {videojuegos.map((videojuego) => (
            <article className="tarjeta" key={videojuego.id}>
              <h2>{videojuego.nombre}</h2>
              <p>{videojuego.descripcion}</p>
              <p>
                {videojuego.plataforma} · {videojuego.categoria}
              </p>
              <p>${videojuego.precio}</p>
              <Link to={`/videojuegos/${videojuego.id}`}>Ver detalle</Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
