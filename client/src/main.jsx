import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import LanguageProvider from "./i18n/LanguageProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

/**
 * main.jsx
 * Punto de entrada principal de la aplicación React.
 *
 * Este archivo se encarga de:
 * - Importar React y ReactDOM
 * - Cargar los estilos globales de Bootstrap y del proyecto
 * - Envolver la aplicación con BrowserRouter para habilitar la navegación
 * - Renderizar el componente App dentro del elemento raíz del HTML
 *
 * Configuración:
 * - React.StrictMode se usa para detectar posibles problemas durante el desarrollo
 * - BrowserRouter permite el uso de rutas con React Router en toda la aplicación
 * - LanguageProvider comparte el idioma elegido (español o inglés) con todos los componentes
 */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);