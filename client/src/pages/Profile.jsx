import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../services/auth";
import { useNavigate } from "react-router-dom";


function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          <h1 className="fw-bold userhome-title">Perfil</h1>
          <p className="userhome-subtitle mb-0">
            Aquí puedes ver la información de tu cuenta.
          </p>
        </div>

        <div className="page-panel-wrapper" style={{ maxWidth: "600px" }}>
          <div className="card border-0 page-panel-card">
            <div className="card-body p-4 p-md-5">
              {loading ? (
                <p className="text-center userhome-subtitle mb-0">
                  Cargando perfil...
                </p>
              ) : error ? (
                <div className="alert alert-danger mb-0">{error}</div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="form-label">Usuario</label>
                    <div className="profile-value">{profile.username}</div>
                  </div>

                  <div className="mb-0">
                    <label className="form-label">Email</label>
                    <div className="profile-value">{profile.email}</div>
                  </div>
                  <div className="mt-4">
                  <button
                    className="btn primary-btn"
                    onClick={() => navigate("/edit-profile")}
                  >
                    Editar perfil
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