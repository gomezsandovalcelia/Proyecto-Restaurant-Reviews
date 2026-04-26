import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProfile, updateProfile, updatePassword } from "../services/auth";

/**
 * EditProfile.jsx
 * Página de edición del perfil del usuario autenticado.
 *
 * Este componente permite modificar:
 * - el nombre de usuario
 * - el correo electrónico
 * - la contraseña
 *
 * La pantalla está dividida en dos formularios independientes:
 * uno para los datos generales de la cuenta y otro para el cambio de contraseña.
 *
 * Hooks usados:
 * - useState: controla los datos de ambos formularios, la carga y los mensajes
 * - useEffect: carga la información actual del perfil al abrir la página
 * - useNavigate: permite volver a la página de perfil
 */

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  /**
   * Carga los datos actuales del perfil al montar el componente
   * para rellenar automáticamente el formulario de edición.
   */
  useEffect(() => {
    async function cargarPerfil() {
      try {
        const data = await getProfile();
        setFormData({
          username: data.username || "",
          email: data.email || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargarPerfil();
  }, []);

  /**
   * Actualiza el estado del formulario de datos de la cuenta
   * cuando el usuario modifica el nombre o el correo electrónico.
   */
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  /**
   * Actualiza el estado del formulario de cambio de contraseña
   * cuando el usuario modifica cualquiera de sus campos.
   */
  function handlePasswordChange(e) {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  /**
   * Gestiona el envío del formulario de edición de perfil.
   *
   * Valida que los campos obligatorios estén completos
   * y envía al backend el nuevo nombre de usuario y el nuevo email.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    const { username, email } = formData;

    if (!username || !email) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const data = await updateProfile({ username, email });
      setMessage(data.message || "Perfil actualizado correctamente");
    } catch (err) {
      setError(err.message);
    }
  }

  /**
   * Gestiona el envío del formulario de cambio de contraseña.
   *
   * Comprueba que todos los campos estén completos,
   * valida que la nueva contraseña y su confirmación coincidan
   * y envía los datos al backend para actualizar la contraseña.
   *
   * Si el cambio es correcto, limpia los campos del formulario.
   */
  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    const { currentPassword, newPassword, confirmNewPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("Todos los campos de contraseña son obligatorios");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Las nuevas contraseñas no coinciden");
      return;
    }

    try {
      const data = await updatePassword({
        currentPassword,
        newPassword,
      });

      setPasswordMessage(data.message || "Contraseña actualizada correctamente");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      setPasswordError(err.message);
    }
  }

  return (
    <div className="min-vh-100 userhome-page">
      <Navbar />

      <main className="container py-5">
        <div className="mb-4 text-center">
          <h1 className="fw-bold userhome-title">Editar perfil</h1>
          <p className="userhome-subtitle mb-0">
            Modifica tu usuario, tu correo y tu contraseña.
          </p>
        </div>

        <div className="page-panel-wrapper" style={{ maxWidth: "700px" }}>
          <div className="card border-0 page-panel-card">
            <div className="card-body p-4 p-md-5">
              {loading ? (
                <p className="text-center userhome-subtitle mb-0">
                  Cargando perfil...
                </p>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="mb-5">
                    <h2 className="h5 mb-4 userhome-title">Datos de la cuenta</h2>

                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Usuario
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control themed-input"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control themed-input"
                        value={formData.email}
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

                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <button type="submit" className="btn primary-btn">
                        Guardar datos
                      </button>
                      <button
                        type="button"
                        className="btn secondary-btn"
                        onClick={() => navigate("/profile")}
                      >
                        Volver
                      </button>
                    </div>
                  </form>

                  <hr className="my-4" />

                  <form onSubmit={handlePasswordSubmit}>
                    <h2 className="h5 mb-4 userhome-title">Cambiar contraseña</h2>

                    <div className="mb-3">
                      <label htmlFor="currentPassword" className="form-label">
                        Contraseña actual
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="form-control themed-input"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        Nueva contraseña
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="form-control themed-input"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="confirmNewPassword" className="form-label">
                        Confirmar nueva contraseña
                      </label>
                      <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        className="form-control themed-input"
                        value={passwordData.confirmNewPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>

                    {passwordError && (
                      <div className="alert alert-danger py-2" role="alert">
                        {passwordError}
                      </div>
                    )}

                    {passwordMessage && (
                      <div className="alert alert-success py-2" role="alert">
                        {passwordMessage}
                      </div>
                    )}

                    <button type="submit" className="btn primary-btn">
                      Cambiar contraseña
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditProfile;