import { delay, graphql, http, HttpResponse } from 'msw';
import { GRAPHQL_ENDPOINT } from '../graphql/endpoint';

const videojuegos = [
  {
    id: 1,
    nombre: 'Super Mario Bros',
    descripcion: 'Juego de plataformas clásico',
    plataforma: 'NES',
    categoria: 'Plataformas',
    precio: 29.99
  }, 
  {
    id: 2,
    nombre: 'The Legend of Zelda',
    descripcion: 'Juego de aventuras y acción',
    plataforma: 'NES',
    categoria: 'Aventura',
    precio: 39.99
  },
  {
    id: 3,
    nombre: 'Metroid',
    descripcion: 'Juego de acción y exploración',
    plataforma: 'NES',
    categoria: 'Acción',
    precio: 34.99
  },
  {
    id: 4,
    nombre: 'Castlevania',
    descripcion: 'Juego de acción y plataformas',
    plataforma: 'NES',
    categoria: 'Acción',
    precio: 24.99
  },
  {
    id: 5,
    nombre: 'Mega Man',
    descripcion: 'Juego de acción y plataformas',
    plataforma: 'NES',
    categoria: 'Acción',
    precio: 19.99
  },
  {
    id: 6,
    nombre: 'Final Fantasy',
    descripcion: 'Juego de rol clásico',
    plataforma: 'NES',
    categoria: 'Rol',
    precio: 49.99
  }
]

const apiGraphql = graphql.link(GRAPHQL_ENDPOINT);

export const handlers = [
  http.get("/api/videojuegos", async ({ request }) => {
    await delay(1000);

    const url = new URL(request.url);
    const error = url.searchParams.get("error");

    if (error === "404") {
      return HttpResponse.json(
        { mensaje: "El recurso de videojuegos no fue encontrado" },
        { status: 404 }
      )
    }

    if (error === "500") {
      return HttpResponse.json(
        { mensaje: "Error interno del servidor" },
        { status: 500 }
      )
    }
    return HttpResponse.json(videojuegos);

  }),

  http.post("/api/videojuegos", async ({ request }) => {
    await delay(1000);

    const nuevoVideojuego = await request.json();
    videojuegos.push(nuevoVideojuego);

    return HttpResponse.json(
      { mensaje: "Videojuego agregado correctamente" },
      { status: 201 }
    );
  }),

  apiGraphql.query("ObtenerVideojuego", async ({ variables }) => {
    await delay(700);

    if (variables?.simularError) {
      return HttpResponse.json({
        errors: [
          {
            message: "No fue posible obtener el detalle del videojuego.",
            extensions: { code: "ERROR_SIMULADO" },
          },
        ],
      }, { status: 404 });
    }

    const videojuego = videojuegos.find(
      (item) => String(item.id) === String(variables?.id)
    );

    return HttpResponse.json({
      data: {
        videojuego: videojuego ?? null,
      },
    });
  }),

]