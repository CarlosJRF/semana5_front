import { gql } from "@apollo/client";

export const OBTENER_VIDEOJUEGO = gql`
  query ObtenerVideojuego($id: ID!, $simularError: Boolean = false) {
    videojuego(id: $id, simularError: $simularError) {
      id
      nombre
      descripcion
      plataforma
      categoria
      precio
    }
  }
`;
