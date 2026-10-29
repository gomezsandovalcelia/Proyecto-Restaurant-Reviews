import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getExploreReviews } from "../services/reviews";
import spanishCities from "../data/spanishCities";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Explore.jsx
 * Página de exploración de reseñas de otros usuarios.
 *
 * Este componente muestra reseñas destacadas publicadas por otros usuarios
 * y permite filtrarlas por ciudad.
 *
 * Cada vez que cambia la ciudad seleccionada, se realiza una nueva petición
 * al backend para obtener las reseñas correspondientes.
 *
 * Hooks usados:
 * - useState: controla la ciudad seleccionada, las reseñas, la carga y los errores
 * - useEffect: carga las reseñas al abrir la página y al cambiar el filtro
 */

function Explore() {
  const [selectedCity, setSelectedCity] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  /**
   * Carga las reseñas destacadas de otros usuarios.
   *
   * Se ejecuta al montar el componente y cada vez que cambia
   * la ciudad seleccionada en el filtro.
   */
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
          <h1 className="fw-bold userhome-title">{t("explore.title")}</h1>
          <p className="userhome-subtitle mb-0">
            {t("explore.subtitle")}
          </p>
        </div>

        <div className="page-panel-wrapper mb-4" style={{ maxWidth: "500px" }}>
          <div className="card border-0 page-panel-card">
            <div className="card-body p-4">
              <label htmlFor="exploreCity" className="form-label">
                {t("explore.filterByCity")}
              </label>

              <select
                id="exploreCity"
                className="form-select themed-input"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">{t("explore.allCities")}</option>
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
          <p className="text-center userhome-subtitle">{t("common.loadingReviews")}</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : reviews.length === 0 ? (
          <div className="card border-0 shadow-sm empty-state-card userhome-empty-card">
            <div className="card-body p-4 p-md-5 text-center">
              <h2 className="h4 mb-3 userhome-title">
                {t("explore.emptyTitle")}
              </h2>
              <p className="userhome-subtitle mb-0">
                {t("explore.emptyText")}
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
                      <strong>{t("review.city")}:</strong> {review.city || t("review.noCity")}
                    </p>

                    <p className="mb-2 review-card-text">
                      <strong>{t("review.location")}:</strong> {review.location}
                    </p>

                    <p className="mb-2 review-card-text">
                      <strong>{t("review.rating")}:</strong> {review.rating}/10
                    </p>

                    <p className="mb-0 review-card-text">
                      <strong>{t("review.recommendedDish")}:</strong> {review.dish}
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