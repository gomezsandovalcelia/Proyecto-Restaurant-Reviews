/**
 * auth.js
 * Funciones del frontend relacionadas con la autenticación y el perfil.
 *
 * Este archivo centraliza las peticiones HTTP relacionadas con:
 * - Registro de usuarios
 * - Inicio de sesión
 * - Obtención de los datos del perfil
 * - Actualización de los datos del perfil
 * - Cambio de contraseña
 */

/**
 * URL base de la API del backend.
 */
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Registra un nuevo usuario en la base de datos.
 *
 * @param {Object} userData - Datos del usuario a registrar
 * @param {string} userData.username - Nombre de usuario
 * @param {string} userData.email - Correo electrónico
 * @param {string} userData.password - Contraseña sin encriptar
 * @returns {Promise<Object>} Respuesta del servidor con mensaje o error
 */
export async function registerUser(userData) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
    }

    return data;
}

/**
 * Inicia sesión con un usuario existente.
 *
 * @param {Object} userData - Credenciales del usuario
 * @param {string} userData.username - Nombre de usuario
 * @param {string} userData.password - Contraseña introducida en el login
 * @returns {Promise<Object>} Respuesta del servidor con el token JWT
 */
export async function loginUser(userData) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
    }

    return data;
}

/**
 * Obtiene los datos del usuario autenticado.
 *
 * @returns {Promise<Object>} Datos del perfil
 */
export async function getProfile() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener el perfil");
  }

  return data;
}

/**
 * Actualiza los datos del perfil del usuario autenticado.
 *
 * @param {Object} profileData - Nuevos datos del perfil
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function updateProfile(profileData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al actualizar el perfil");
  }

  return data;
}

/**
 * Cambia la contraseña del usuario autenticado.
 *
 * @param {Object} passwordData - Datos para el cambio de contraseña
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function updatePassword(passwordData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/profile/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al cambiar la contraseña");
  }

  return data;
}