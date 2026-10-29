import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageToggle from "../components/LanguageToggle";

/**
 * Profile.jsx
 * Página de perfil del usuario autenticado.
 *
 * Este componente obtiene y muestra los datos principales
 * de la cuenta del usuario logueado, concretamente:
 * - nombre de usuario
 * - correo electrónico
 *
 * También permite acceder a la pantalla de edición del perfil.
 *
 * Hooks usados:
 * - useState: controla los datos del perfil, la carga y los errores
 * - useEffect: carga la información del perfil al abrir la página
 * - useNavigate: redirige al usuario a la pantalla de edición
 */

function Profile() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  /**
   * Carga los datos del perfil del usuario autenticado
   * al montar el componente.
   */
  useEffect(() => {
    async function cargarPerfil() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargarPerfil();
  }, []);

  return (
    <div className="min-vh-100 userhome-page">
      <Navbar />

      <main className="container py-5">
        <div className="mb-4 text-center">
          <h1 className="fw-bold userhome-title">{t("profile.title")}</h1>
          <p className="userhome-subtitle mb-0">
            {t("profile.subtitle")}
          </p>
        </div>

        <div className="page-panel-wrapper" style={{ maxWidth: "600px" }}>
          <div className="card border-0 page-panel-card">
            <div className="card-body p-4 p-md-5">
              {loading ? (
                <p className="text-center userhome-subtitle mb-0">
                  {t("common.loadingProfile")}
                </p>
              ) : error ? (
                <div className="alert alert-danger mb-0">{error}</div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="form-label">{t("common.username")}</label>
                    <div className="profile-value">{profile.username}</div>
                  </div>

                  <div className="mb-0">
                    <label className="form-label">{t("common.email")}</label>
                    <div className="profile-value">{profile.email}</div>
                  </div>

                  <div className="mt-4">
                    <label className="form-label d-block">{t("profile.language")}</label>
                    <LanguageToggle />
                  </div>
                  <div className="mt-4">
                  <button
                    className="btn primary-btn"
                    onClick={() => navigate("/edit-profile")}
                  >
                    {t("profile.editProfile")}
                  </button>
                </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;