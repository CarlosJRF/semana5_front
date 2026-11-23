import { useCallback, useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router";
import Videojuegos from "./pages/Videojuegos";
import DetalleVideojuego from "./pages/DetalleVideojuego";
import Inicio from "./pages/Inicio";
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada";

async function obtenerVideojuegos(tipoError = "", signal) {
  const endpoint = tipoError
    ? `/api/videojuegos?error=${tipoError}`
    : `/api/videojuegos`;

  try {
    const respuesta = await fetch(endpoint, { signal });

    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        throw new Error("Recurso no encontrado");
      }
      if (respuesta.status === 500) {
        throw new Error("Error interno del servidor");
      }
    }

    return await respuesta.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Ocurrió un error de conexión, por favor intente nuevamente.", { cause: error });
    }
    throw error;
  }

}


export default function App() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [cargando, setCargando] = useState(true);  // cambiar a true para indicar que inicialmente se está cargando
  const [error, setError] = useState("");

  const cargarVideoJuegos = useCallback((tipoError = "") => {
    setCargando(true);
    setError("");

    obtenerVideojuegos(tipoError)
      .then((data) => setVideojuegos(data))
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false));
  }, []);



  useEffect(() => {
    const controlador = new AbortController();

    obtenerVideojuegos("", controlador.signal)
    .then((data) => setVideojuegos(data))
    .catch((error) => {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    })
    .finally(() => {
      if (!controlador.signal.aborted) {
        setCargando(false);
      }
    })

    return () => {
      controlador.abort();
    }

  }, [])


  return (
    <div className="contenedor">
      <header>
        <nav aria-label="Navegación principal">
          <NavLink to="/" end>
            Inicio
          </NavLink>

          <NavLink to="/videojuegos">Videojuegos</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route
            path="/videojuegos"
            element={
              <Videojuegos
                videojuegos={videojuegos}
                cargando={cargando}
                error={error}
                cargarVideoJuegos={cargarVideoJuegos}
              />
            }
          />

          <Route path="/videojuegos/:id" element={<DetalleVideojuego />} />

          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>
    </div>
  );
}
