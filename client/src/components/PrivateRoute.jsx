import { Navigate } from "react-router-dom";

/**
 * PrivateRoute.jsx
 * Componente de protección de rutas privadas del frontend.
 *
 * Este componente comprueba si existe un token guardado en localStorage.
 * Si el usuario no está autenticado, redirige automáticamente
 * a la pantalla de login mediante Navigate.
 *
 * @param {Object} props - Propiedades del componente
 * @param {JSX.Element} props.children - Componente que se renderiza si hay token
 * @returns {JSX.Element} Ruta protegida o redirección al login
 */

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;