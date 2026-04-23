import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createReview } from "../services/reviews";

function CreateReview() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    restaurantName: "",
    location: "",
    rating: "",
    dish: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { restaurantName, location, rating, dish } = formData;

    if (!restaurantName || !location || !rating || !dish) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await createReview({
        restaurantName,
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
          <h1 className="fw-bold userhome-title">Crear reseña</h1>
          <p className="userhome-subtitle mb-0">
            Añade un restaurante y guarda tu experiencia.
          </p>
        </div>

        <div className="page-panel-wrapper">
          <div className="card border-0 page-panel-card">
            <div className="card-body p-4 p-md-5">
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
                    placeholder="Ej. Goiko"
                    value={formData.restaurantName}
                    onChange={handleChange}
                  />
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
                    placeholder="Ej. Murcia centro"
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
                    placeholder="Ej. 8"
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
                    placeholder="Ej. Raviolis de trufa"
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
                    Guardar reseña
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateReview;