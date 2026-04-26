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

/**
 * App.jsx
 * Estructura general de la aplicación.
 *
 * Rutas públicas:
 * - "/" -> Pantalla de inicio de sesión
 * - "/register" -> Pantalla de registro de usuario
 *
 * Rutas privadas protegidas con PrivateRoute:
 * - "/home" -> Pantalla principal del usuario con sus reseñas
 * - "/create-review" -> Formulario para crear una nueva reseña
 * - "/edit-review/:id" -> Formulario para editar una reseña existente
 * - "/profile" -> Página de perfil del usuario autenticado
 * - "/edit-profile" -> Página para editar los datos del perfil
 * - "/explore" -> Página para explorar reseñas de otros usuarios
 *
 * Routing:
 * - Usa React Router para cargar las distintas vistas de la aplicación
 * - Usa el componente PrivateRoute para restringir el acceso a las rutas privadas
 * - La ruta de edición de reseña utiliza un parámetro :id
 */

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