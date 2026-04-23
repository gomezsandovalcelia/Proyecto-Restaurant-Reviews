/**
 * App.jsx
 * Estructura general de la aplicación.
 *
 * Contiene el sistema de rutas principal de la app:
 * - "/" -> Pantalla de login
 * - "/register" -> Pantalla de registro
 * - "/home" -> Pantalla principal del usuario autenticado
 *
 * Routing:
 * - Usa React Router para cargar las vistas principales
 */

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import CreateReview from "./pages/CreateReview";
import EditReview from "./pages/EditReview";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import EditProfile from "./pages/EditProfile";
import Explore from "./pages/Explore";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <UserHome />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-review"
        element={
          <PrivateRoute>
            <CreateReview />
          </PrivateRoute>
        }
      />


      <Route
        path="/edit-review/:id"
        element={
          <PrivateRoute>
            <EditReview />
          </PrivateRoute>
        }
      />

      
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/explore"
        element={
          <PrivateRoute>
            <Explore />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;