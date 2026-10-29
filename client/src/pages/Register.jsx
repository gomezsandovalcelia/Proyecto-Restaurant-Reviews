import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/auth";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Register.jsx
 * Pantalla de registro de nuevos usuarios.
 *
 * Este componente permite crear una cuenta nueva mediante un formulario
 * con nombre de usuario, correo electrónico y contraseña.
 * Antes de enviar los datos al backend, valida que todos los campos
 * estén completos y que ambas contraseñas coincidan.
 *
 * Hooks usados:
 * - useState: controla los valores del formulario, los mensajes y los errores
*/

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { t } = useLanguage();

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
  * Gestiona el envío del formulario de registro.
  *
  * Comprueba que todos los campos obligatorios estén completos,
  * valida que la contraseña y su confirmación coincidan
  * y envía los datos al backend para crear un nuevo usuario.
  *
  * Si el registro es correcto, muestra un mensaje de éxito
  * y limpia el formulario.
  */
  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError(t("common.allFieldsRequired"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("register.passwordsDontMatch"));
      return;
    }

    try {
      const data = await registerUser({
        username,
        email,
        password,
      });

      setMessage(data.message || t("register.success"));

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
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
                <div className="d-flex justify-content-end mb-2">
                  <LanguageToggle />
                </div>

                <div className="text-center mb-4">
                  <img
                    src="/images/logo.png"
                    alt="Restaurant Reviews"
                    className="auth-logo mb-3"
                  />
                  <p className="auth-subtitle mb-0">
                    {t("register.subtitle")}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label auth-label">
                      {t("register.username")}
                    </label>
                    <input
                      type="text"
                      className="form-control themed-input"
                      id="username"
                      name="username"
                      placeholder={t("common.usernamePlaceholder")}
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label auth-label">
                      {t("register.email")}
                    </label>
                    <input
                      type="email"
                      className="form-control themed-input"
                      id="email"
                      name="email"
                      placeholder={t("register.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label auth-label">
                      {t("common.password")}
                    </label>
                    <input
                      type="password"
                      className="form-control themed-input"
                      id="password"
                      name="password"
                      placeholder={t("common.passwordPlaceholder")}
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label auth-label">
                      {t("register.confirmPassword")}
                    </label>
                    <input
                      type="password"
                      className="form-control themed-input"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder={t("register.confirmPasswordPlaceholder")}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger py-2" role="alert">
                      {error}
                    </div>
                  )}

                  {message && (
                    <div className="alert alert-success py-2" role="alert">
                      {message}
                    </div>
                  )}

                  <button type="submit" className="btn primary-btn w-100 mb-3">
                    {t("register.submit")}
                  </button>
                </form>

                <div className="text-center">
                  <p className="mb-2 auth-subtitle">{t("register.haveAccount")}</p>
                  <Link to="/" className="btn secondary-btn w-100">
                    {t("register.goToLogin")}
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

export default Register;