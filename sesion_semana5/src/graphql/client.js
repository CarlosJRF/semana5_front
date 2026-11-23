import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { GRAPHQL_ENDPOINT } from "./endpoint";

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
  // MSW construye respuestas simuladas sin el campo __typename que Apollo
  // agrega normalmente a las consultas dirigidas a un servidor GraphQL.
  cache: new InMemoryCache({ addTypename: false }),
});
