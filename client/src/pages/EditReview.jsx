import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getReviewById, updateReview } from "../services/reviews";
import spanishCities from "../data/spanishCities";

function EditReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    restaurantName: "",
    city: "",
    location: "",
    rating: "",
    dish: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarReview() {
      try {
        const review = await getReviewById(id);

        setFormData({
          restaurantName: review.restaurantName || "",
          city: review.city || "",
          location: review.location || "",
          rating: review.rating || "",
          dish: review.dish || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargarReview();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { restaurantName, city, location, rating, dish } = formData;

    if (!restaurantName || !city || !location || !rating || !dish) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await updateReview(id, {
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
          <h1 className="fw-bold userhome-title">Editar reseña</h1>
          <p className="userhome-subtitle mb-0">
            Modifica los datos de tu reseña y guarda los cambios.
          </p>
        </div>

        <div className="page-panel-wrapper">
          <div className="card border-0 page-panel-card">
            <div className="card-body p-4 p-md-5">
              {loading ? (
                <p className="text-center userhome-subtitle mb-0">
                  Cargando reseña...
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="restaurantName" className="form-label">
                      Nombre del restaurante
                    </label>
                    <input
                      type="text"
                      id="restaurantName"
                      name="restaurantName"
                      className="form-control themed-input"
                      value={formData.restaurantName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      Ciudad
                    </label>
                    <select
                      id="city"
                      name="city"
                      className="form-select themed-input"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona una ciudad</option>
                      {spanishCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-control themed-input"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                      Nota
                    </label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      className="form-control themed-input"
                      min="0"
                      max="10"
                      value={formData.rating}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="dish" className="form-label">
                      Plato que repetirías
                    </label>
                    <input
                      type="text"
                      id="dish"
                      name="dish"
                      className="form-control themed-input"
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
                      Guardar cambios
                    </button>
                    <button
                      type="button"
                      className="btn secondary-btn"
                      onClick={() => navigate("/home")}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditReview;