/**
 * mensajes.js
 * Mensajes de respuesta de la API en español e inglés.
 *
 * El idioma se elige a partir de la cabecera Accept-Language
 * que envía el frontend. Si no llega o no es inglés, se usa español.
 */

const mensajes = {
  es: {
    camposObligatorios: "Todos los campos son obligatorios",
    usuarioExiste: "Ese nombre de usuario ya existe",
    emailExiste: "Ese correo ya está registrado",
    usuarioRegistrado: "Usuario registrado correctamente",
    errorServidor: "Error en el servidor",
    usuarioPasswordObligatorios: "Usuario y contraseña obligatorios",
    credencialesIncorrectas: "Credenciales incorrectas",
    loginCorrecto: "Login correcto",
    tokenRequerido: "Token requerido",
    tokenInvalido: "Token inválido",
    usuarioNoEncontrado: "Usuario no encontrado",
    reviewCreada: "Reseña creada correctamente",
    reviewNoEncontrada: "Reseña no encontrada",
    sinCambios: "No se realizaron cambios",
    reviewActualizada: "Reseña actualizada correctamente",
    usuarioEmailObligatorios: "Usuario y email son obligatorios",
    perfilActualizado: "Perfil actualizado correctamente",
    camposPasswordObligatorios: "Todos los campos de contraseña son obligatorios",
    passwordActualIncorrecta: "La contraseña actual no es correcta",
    passwordActualizada: "Contraseña actualizada correctamente",
    apiFuncionando: "API funcionando correctamente",
    recursoNoEncontrado: "Recurso no encontrado",
  },
  en: {
    camposObligatorios: "All fields are required",
    usuarioExiste: "That username already exists",
    emailExiste: "That email is already registered",
    usuarioRegistrado: "User registered successfully",
    errorServidor: "Server error",
    usuarioPasswordObligatorios: "Username and password are required",
    credencialesIncorrectas: "Invalid credentials",
    loginCorrecto: "Login successful",
    tokenRequerido: "Token required",
    tokenInvalido: "Invalid token",
    usuarioNoEncontrado: "User not found",
    reviewCreada: "Review created successfully",
    reviewNoEncontrada: "Review not found",
    sinCambios: "No changes were made",
    reviewActualizada: "Review updated successfully",
    usuarioEmailObligatorios: "Username and email are required",
    perfilActualizado: "Profile updated successfully",
    camposPasswordObligatorios: "All password fields are required",
    passwordActualIncorrecta: "The current password is incorrect",
    passwordActualizada: "Password updated successfully",
    apiFuncionando: "API is running",
    recursoNoEncontrado: "Resource not found",
  },
};

/**
 * Devuelve un mensaje en el idioma de la petición.
 *
 * @param {Object} peticion - Petición de Express
 * @param {string} clave - Clave del mensaje
 * @returns {string} Mensaje traducido
 */
export function mensaje(peticion, clave) {
  const idioma = peticion.acceptsLanguages("es", "en") === "en" ? "en" : "es";
  return mensajes[idioma][clave];
}
