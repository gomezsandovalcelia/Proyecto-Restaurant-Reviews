import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

/**
 * Home.jsx
 * Pantalla de inicio de sesión de la aplicación.
 *
 * Este componente permite al usuario introducir sus credenciales,
 * enviarlas al backend y, si son correctas, guardar el token JWT
 * en localStorage para acceder a la zona privada de la aplicación.
 *
 * Hooks usados:
 * - useState: controla los valores del formulario y los errores
 * - useNavigate: redirige al usuario a la pantalla principal tras el login
 */

function Home() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  /**
  * Actualiza el estado del formulario cada vez que el usuario
  * modifica uno de los campos de entrada.
  */
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }
  /**
  * Gestiona el envío del formulario de login.
  *
  * Valida que los campos obligatorios estén completos,
  * envía las credenciales al backend y, si el login es correcto,
  * guarda el token recibido y redirige al usuario a la pantalla principal.
  */
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { username, password } = formData;

    if (!username || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const data = await loginUser({ username, password });
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container-fluid min-vh-100 auth-page">
      <div className="row min-vh-100">
        <div className="col-lg-6 d-none d-lg-block p-0">
          <div className="home-image"></div>
        </div>

        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center auth-side">
          <div className="w-100 px-4" style={{ maxWidth: "440px" }}>
            <div className="card auth-card shadow border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <img
                    src="/images/logo.png"
                    alt="Restaurant Reviews"
                    className="auth-logo mb-3"
                  />
                  <p className="auth-subtitle mb-0">
                    Inicia sesión para continuar
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label auth-label">
                      Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control themed-input"
                      id="username"
                      name="username"
                      placeholder="Introduce tu usuario"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label auth-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control themed-input"
                      id="password"
                      name="password"
                      placeholder="Introduce tu contraseña"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger py-2" role="alert">
                      {error}
                    </div>
                  )}

                  <button type="submit" className="btn primary-btn w-100 mb-3">
                    Iniciar sesión
                  </button>
                </form>

                <div className="text-center">
                  <p className="mb-2 auth-subtitle">¿No tienes cuenta?</p>
                  <Link to="/register" className="btn secondary-btn w-100">
                    Ir a registro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}

export default Home;