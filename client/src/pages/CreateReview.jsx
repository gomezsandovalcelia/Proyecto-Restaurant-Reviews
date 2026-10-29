import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createReview } from "../services/reviews";
import spanishCities from "../data/spanishCities";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * CreateReview.jsx
 * Pantalla de creación de una nueva reseña.
 *
 * Este componente permite al usuario autenticado registrar
 * un nuevo restaurante indicando:
 * - nombre
 * - ciudad
 * - ubicación
 * - nota
 * - plato recomendado
 *
 * Los datos se envían al backend y, si la creación es correcta,
 * el usuario es redirigido a la pantalla principal de sus reseñas.
 *
 * Hooks usados:
 * - useState: controla los datos del formulario y los errores
 * - useNavigate: redirige al usuario tras crear la reseña o cancelar
 */

function CreateReview() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    restaurantName: "",
    city: "",
    location: "",
    rating: "",
    dish: "",
  });

  const [error, setError] = useState("");

  /**
   * Actualiza el estado del formulario cada vez que el usuario
   * modifica uno de los campos de entrada o selección.
   */
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  /**
   * Gestiona el envío del formulario de creación de reseña.
   *
   * Comprueba que todos los campos obligatorios estén completos
   * y envía los datos al backend para guardar la nueva reseña.
   *
   * Si la operación es correcta, redirige al usuario a la pantalla principal.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { restaurantName, city, location, rating, dish } = formData;

    if (!restaurantName || !city || !location || !rating || !dish) {
      setError(t("common.allFieldsRequired"));
      return;
    }

    try {
      await createReview({
        restaurantName,
        city,
        location,
        rating,
        dish,
      });

      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-vh-100 userhome-page">
      <Navbar />

      <main className="container py-5">
        <div className="mb-4 text-center">
          <h1 className="fw-bold userhome-title">{t("createReview.title")}</h1>
          <p className="userhome-subtitle mb-0">
            {t("createReview.subtitle")}
          </p>
        </div>

        <div className="page-panel-wrapper">
          <div className="card border-0 page-panel-card">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="restaurantName" className="form-label">
                    {t("review.restaurantName")}
                  </label>
                  <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    className="form-control themed-input"
                    placeholder={t("review.restaurantPlaceholder")}
                    value={formData.restaurantName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    {t("review.city")}
                  </label>
                  <select
                    id="city"
                    name="city"
                    className="form-select themed-input"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="">{t("review.selectCity")}</option>
                    {spanishCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    {t("review.location")}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="form-control themed-input"
                    placeholder={t("review.locationPlaceholder")}
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="rating" className="form-label">
                    {t("review.rating")}
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    className="form-control themed-input"
                    min="0"
                    max="10"
                    placeholder={t("review.ratingPlaceholder")}
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="dish" className="form-label">
                    {t("review.dish")}
                  </label>
                  <input
                    type="text"
                    id="dish"
                    name="dish"
                    className="form-control themed-input"
                    placeholder={t("review.dishPlaceholder")}
                    value={formData.dish}
                    onChange={handleChange}
                  />
                </div>

                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}

                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button type="submit" className="btn primary-btn">
                    {t("createReview.submit")}
                  </button>
                  <button
                    type="button"
                    className="btn secondary-btn"
                    onClick={() => navigate("/home")}
                  >
                    {t("common.cancel")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateReview;