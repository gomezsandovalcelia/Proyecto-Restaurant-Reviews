/**
 * auth.js
 * Funciones de autenticación del frontend.
 *
 * Este archivo centraliza las peticiones HTTP relacionadas con:
 * - Registro de usuarios
 * - Inicio de sesión
 *
 * Datos:
 * - API_URL: URL base del backend
 */

const API_URL = "http://localhost:4000";

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