import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop.tsx";
import AppContext from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppContext>
          <ScrollToTop />
          <App />
        </AppContext>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
