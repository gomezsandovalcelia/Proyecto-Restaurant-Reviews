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
 *
 * Cada petición envía el idioma elegido en la cabecera Accept-Language
 * para que el servidor responda con los mensajes en ese idioma.
 */

import { getStoredLanguage, translate } from "../i18n/translations";

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
      "Accept-Language": getStoredLanguage(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || translate(getStoredLanguage(), "errors.createReview"));
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
      "Accept-Language": getStoredLanguage(),
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || translate(getStoredLanguage(), "errors.getReviews"));
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
      "Accept-Language": getStoredLanguage(),
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

    throw new Error(data.error || translate(getStoredLanguage(), "errors.deleteReview"));
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
      "Accept-Language": getStoredLanguage(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || translate(getStoredLanguage(), "errors.updateReview"));
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
      "Accept-Language": getStoredLanguage(),
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || translate(getStoredLanguage(), "errors.getReview"));
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
      "Accept-Language": getStoredLanguage(),
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || translate(getStoredLanguage(), "errors.getExplore"));
  }

  return data;
}