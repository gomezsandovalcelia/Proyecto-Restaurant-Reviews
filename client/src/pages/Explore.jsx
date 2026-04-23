import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getExploreReviews } from "../services/reviews";
import spanishCities from "../data/spanishCities";

function Explore() {
  const [selectedCity, setSelectedCity] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarReviews() {
      try {
        setLoading(true);
        setError("");

        const data = await getExploreReviews(selectedCity);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargarReviews();
  }, [selectedCity]);

  return (
    <div className="min-vh-100 userhome-page">
      <Navbar />

      <main className="container py-5">
        <div className="mb-4 text-center">
          <h1 className="fw-bold userhome-title">Explorar</h1>
          <p className="userhome-subtitle mb-0">
            Descubre las mejores reseñas de otros usuarios.
          </p>
        </div>

        <div className="page-panel-wrapper mb-4" style={{ maxWidth: "500px" }}>
          <div className="card border-0 page-panel-card">
            <div className="card-body p-4">
              <label htmlFor="exploreCity" className="form-label">
                Filtrar por ciudad
              </label>

              <select
                id="exploreCity"
                className="form-select themed-input"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Todas las ciudades</option>
                {spanishCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center userhome-subtitle">Cargando reseñas...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : reviews.length === 0 ? (
          <div className="card border-0 shadow-sm empty-state-card userhome-empty-card">
            <div className="card-body p-4 p-md-5 text-center">
              <h2 className="h4 mb-3 userhome-title">
                No hay reseñas para mostrar
              </h2>
              <p className="userhome-subtitle mb-0">
                Prueba con otra ciudad o espera a que otros usuarios publiquen reseñas.
              </p>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {reviews.map((review) => (
              <div key={review._id} className="col-12 col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100 review-card">
                  <div className="card-body d-flex flex-column">
                    <h3 className="h5 review-card-title">
                      {review.restaurantName}
                    </h3>

                    <p className="review-card-location mb-1">
                      <strong>Ciudad:</strong> {review.city || "Sin ciudad"}
                    </p>

                    <p className="mb-2 review-card-text">
                      <strong>Ubicación:</strong> {review.location}
                    </p>

                    <p className="mb-2 review-card-text">
                      <strong>Nota:</strong> {review.rating}/10
                    </p>

                    <p className="mb-0 review-card-text">
                      <strong>Plato recomendado:</strong> {review.dish}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Explore;