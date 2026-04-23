const API_URL = "http://localhost:4000";

/**
 * Crea una nueva reseña.
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
 * Devuelve las reseñas del usuario autenticado.
 *
 * @returns {Promise<Array>} Lista de reseñas
 */
export async function getUserReviews() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/reviews`, {
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