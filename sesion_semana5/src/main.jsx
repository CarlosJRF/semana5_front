import { ApolloProvider } from "@apollo/client/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { apolloClient } from "./graphql/client";
import "./index.css";

async function iniciarAplicacion() {

  // Esta aplicación de demostración mantiene los mocks activos también en la
  // compilación estática, salvo que se indique VITE_MSW_ENABLED=false.
  const mocksHabilitados =
    import.meta.env.DEV || import.meta.env.VITE_MSW_ENABLED !== "false";

  if (mocksHabilitados) {
    const { worker } = await import('./mocks/browser');

    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
        options: { scope: import.meta.env.BASE_URL },
      },
    })

  }

  // BrowserRouter necesita un basename sin la barra final.
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  createRoot(document.getElementById("root")).render(
    <ApolloProvider client={apolloClient}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
}

iniciarAplicacion().catch((error) => {
  console.error("No se pudo iniciar la aplicación:", error);

  document.getElementById("root").textContent =
  "No se pudo iniciar la aplicación. Revisen la consola del navegador.";
});
