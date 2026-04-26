/**
 * reviews.js
 * Funciones del frontend relacionadas con la gestión de reseñas.
 *
 * Este archivo centraliza las peticiones HTTP relacionadas con:
 * - Creación de reseñas
 * - Obtención de reseñas del usuario autenticado
 * - Obtención de una reseña concreta
 * - Edición de reseñas
 * - Borrado de reseñas
 * - Consulta de reseñas destacadas en la sección Explorar
 */

/**
 * URL base de la API del backend.
 *
 * Se obtiene desde una variable de entorno de Vite para poder
 * cambiar fácilmente entre desarrollo y producción.
 */
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Crea una nueva reseña del usuario autenticado.
 *
 * @param {Object} reviewData - Datos de la reseña
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function createReview(reviewData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al crear la reseña");
  }

  return data;
}

/**
 * Obtiene las reseñas del usuario autenticado en formato paginado.
 *
 * @param {number} page - Página actual
 * @returns {Promise<Object>} Reseñas y datos de paginación
 */
export async function getUserReviews(page = 1) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/reviews?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener las reseñas");
  }

  return data;
}

/**
 * Borra una reseña del usuario autenticado.
 *
 * @param {string} reviewId - Id de la reseña a borrar
 * @returns {Promise<void>}
 */
export async function deleteReview(reviewId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    throw new Error(data.error || "Error al borrar la reseña");
  }
}

/**
 * Actualiza una reseña del usuario autenticado.
 *
 * @param {string} reviewId - Id de la reseña a editar
 * @param {Object} reviewData - Nuevos datos de la reseña
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function updateReview(reviewId, reviewData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al actualizar la reseña");
  }

  return data;
}

/**
 * Obtiene una reseña concreta del usuario autenticado.
 *
 * @param {string} reviewId - Id de la reseña
 * @returns {Promise<Object>} Reseña encontrada
 */
export async function getReviewById(reviewId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener la reseña");
  }

  return data;
}

/**
 * Obtiene reseñas destacadas de otros usuarios para la sección Explorar.
 * 
 * Permite aplicar flitro opcional por ciudad
 *
 * @param {string} city - Ciudad por la que filtrar (opcional)
 * @returns {Promise<Array>} Lista de reseñas
 */
export async function getExploreReviews(city = "") {
  const token = localStorage.getItem("token");

  const query = city ? `?city=${encodeURIComponent(city)}` : "";

  const response = await fetch(`${API_URL}/explore${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener las reseñas de explorar");
  }

  return data;
}