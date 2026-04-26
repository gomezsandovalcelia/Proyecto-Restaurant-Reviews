import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUserReviews, deleteReview } from "../services/reviews";

/**
 * UserHome.jsx
 * Página principal del usuario autenticado.
 *
 * Este componente muestra las reseñas del usuario logueado y permite:
 * - Consultar sus reseñas paginadas
 * - Ordenarlas por fecha o por nota
 * - Acceder a la edición de una reseña
 * - Eliminar una reseña mediante un modal de confirmación
 *
 * Hooks usados:
 * - useState: gestiona reseñas, carga, errores, orden y paginación
 * - useEffect: carga las reseñas al cambiar de página
 * - useMemo: ordena las reseñas según el criterio seleccionado
 */

function UserHome() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [sortType, setSortType] = useState("date");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  /**
  * Carga las reseñas del usuario autenticado cada vez que cambia la página actual.
  *
  * La respuesta del backend incluye tanto las reseñas como la información
  * necesaria para construir la paginación.
  */
  useEffect(() => {
    async function cargarReviews() {
      try {
        setLoading(true);
        const data = await getUserReviews(currentPage);
        setReviews(data.reviews);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargarReviews();
  }, [currentPage]);

  /**
  * Abre el modal de confirmación de borrado y guarda
  * la reseña seleccionada en el estado.
  */
  function openDeleteModal(review) {
    setReviewToDelete(review);
  }

  /**
  * Cierra el modal de borrado y limpia la reseña seleccionada.
  */
  function closeDeleteModal() {
    setReviewToDelete(null);
  }

  /**
  * Borra la reseña seleccionada y vuelve a cargar la página actual de resultados.
  *
  * Si al borrar la última reseña de la página actual esta queda vacía,
  * retrocede automáticamente a la página anterior.
  */
  async function confirmDelete() {
    if (!reviewToDelete) return;

    try {
      await deleteReview(reviewToDelete._id);

      const data = await getUserReviews(currentPage);
      setReviews(data.reviews);
      setTotalPages(data.totalPages);

      if (data.reviews.length === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }

      closeDeleteModal();
    } catch (err) {
      setError(err.message);
      closeDeleteModal();
    }
  }
  /**
  * Genera una copia ordenada de las reseñas mostradas en la página actual.
  *
  * Permite ordenarlas por:
  * - fecha de creación, mostrando primero las más recientes
  * - nota, mostrando primero las de mayor puntuación
  */
  const sortedReviews = useMemo(() => {
    const reviewsCopy = [...reviews];

    if (sortType === "rating") {
      return reviewsCopy.sort((a, b) => b.rating - a.rating);
    }

    return reviewsCopy.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }, [reviews, sortType]);

  return (
    <div className="min-vh-100 userhome-page">
      <Navbar />

      <main className="container py-5">
        <div className="mb-4 text-center">
          <h1 className="fw-bold userhome-title">Mis reseñas</h1>
          <p className="userhome-subtitle mb-0">
            Aquí puedes ver y gestionar todos los restaurantes que has guardado.
          </p>
        </div>

        {loading ? (
          <p className="text-center userhome-subtitle">Cargando reseñas...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : reviews.length === 0 ? (
          <div className="card border-0 shadow-sm empty-state-card userhome-empty-card">
            <div className="card-body p-4 p-md-5 text-center">
              <h2 className="h4 mb-3 userhome-title">Todavía no tienes reseñas</h2>
              <p className="userhome-subtitle mb-4">
                Empieza guardando tu primera experiencia en un restaurante.
              </p>

              <Link to="/create-review" className="btn primary-btn">
                Crear reseña
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
              <button
                className={`btn btn-sm sort-btn ${
                  sortType === "date" ? "primary-btn" : "secondary-btn"
                }`}
                onClick={() => setSortType("date")}
              >
                Fecha
              </button>

              <button
                className={`btn btn-sm sort-btn ${
                  sortType === "rating" ? "primary-btn" : "secondary-btn"
                }`}
                onClick={() => setSortType("rating")}
              >
                Nota
              </button>
            </div>

            <div className="row g-4 mb-4">
              {sortedReviews.map((review) => (
                <div key={review._id} className="col-12 col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm h-100 review-card">
                    <div className="card-body d-flex flex-column">
                      <h3 className="h5 review-card-title">{review.restaurantName}</h3>

                      <p className="review-card-location mb-1">
                        <strong>Ciudad:</strong> {review.city || "Sin ciudad"}
                      </p>

                      <p className="mb-2 review-card-text">
                        <strong>Ubicación:</strong> {review.location}
                      </p>

                      <p className="mb-2 review-card-text">
                        <strong>Nota:</strong> {review.rating}/10
                      </p>

                      <p className="mb-4 review-card-text">
                        <strong>Plato recomendado:</strong> {review.dish}
                      </p>

                      <div className="mt-auto d-flex gap-2">
                        <Link
                          to={`/edit-review/${review._id}`}
                          className="btn secondary-btn w-50"
                        >
                          Editar
                        </Link>

                        <button
                          className="btn delete-btn w-50"
                          onClick={() => openDeleteModal(review)}
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
                <button
                  className="btn secondary-btn"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>

                <span className="pagination-info">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  className="btn secondary-btn"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {reviewToDelete && (
        <>
          <div className="custom-modal-backdrop"></div>

          <div className="custom-modal-wrapper">
            <div className="card border-0 shadow custom-modal-card">
              <div className="card-body p-4">
                <h2 className="h5 mb-3 userhome-title">Confirmar borrado</h2>
                <p className="mb-4 review-card-text">
                  ¿Seguro que quieres borrar la reseña de{" "}
                  <strong>{reviewToDelete.restaurantName}</strong>?
                </p>

                <div className="d-flex gap-2 justify-content-end">
                  <button
                    className="btn secondary-btn"
                    onClick={closeDeleteModal}
                  >
                    Cancelar
                  </button>
                  <button className="btn delete-btn" onClick={confirmDelete}>
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserHome;