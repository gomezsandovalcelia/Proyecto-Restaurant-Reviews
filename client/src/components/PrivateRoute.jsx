/**
 * Componente PrivateRoute
 *
 * Este componente protege rutas privadas de la aplicación.
 * Comprueba si existe un token en localStorage y, si no existe,
 * redirige al usuario a la pantalla de login.
 *
 * @param {Object} props
 * @param {JSX.Element} props.children - Componente que se renderiza si hay token
 * @returns {JSX.Element}
 */

import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;