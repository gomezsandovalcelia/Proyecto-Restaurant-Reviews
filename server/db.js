/**
 * db.js
 * Funciones de acceso a datos de la aplicación.
 *
 * Este archivo centraliza la conexión con MongoDB y las operaciones
 * relacionadas con las colecciones principales del proyecto:
 * - usuarios
 * - reviews
 *
 * También agrupa las consultas necesarias para el registro,
 * login, perfil de usuario, gestión de reseñas y sección Explorar.
 */

import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8", "8.8.4.4"]);

import { MongoClient, ObjectId } from "mongodb";

/**
 * URL de conexión a MongoDB obtenida desde variables de entorno.
 */
const urlMongo = process.env.MONGO_URL;

/**
 * Cliente reutilizable de MongoDB para mantener una única conexión activa.
 */
let client = null;

/**
 * Establece la conexión con MongoDB.
 *
 * La primera vez crea el cliente de MongoDB y realiza la conexión.
 * En las siguientes llamadas reutiliza la misma conexión ya abierta.
 *
 * Si la conexión falla, limpia el cliente para evitar reutilizar
 * una instancia cerrada o inválida en la siguiente petición.
 *
 * @returns {Promise<MongoClient>} Cliente de MongoDB conectado
 */
async function conectar() {
  if (client) {
    return client;
  }

  const nuevoClient = new MongoClient(urlMongo);

  try {
    await nuevoClient.connect();
    client = nuevoClient;
    return client;
  } catch (error) {
    try {
      await nuevoClient.close();
    } catch {
      // No hacer nada si el cierre también falla
    }

    client = null;
    throw error;
  }
}
/**
 * Busca un usuario por su nombre de usuario.
 *
 * @param {string} nombreUsuario - Nombre del usuario a buscar
 * @returns {Promise<Object|null>} Usuario encontrado o null
 */

export async function buscarUsuarioPorNombre(nombreUsuario) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("usuarios");

  return await coleccion.findOne({ username: nombreUsuario });
}

/**
 * Busca un usuario por su correo electrónico.
 *
 * @param {string} email - Correo electrónico a buscar
 * @returns {Promise<Object|null>} Usuario encontrado o null
 */

export async function buscarUsuarioPorEmail(email) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("usuarios");

  return await coleccion.findOne({ email: email });
}

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * @param {Object} usuario - Datos del nuevo usuario
 * @returns {Promise<ObjectId>} Identificador del usuario insertado
 */

export async function crearUsuario(usuario) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("usuarios");

  const resultado = await coleccion.insertOne(usuario);
  return resultado.insertedId;
}

/**
 * Crea una nueva reseña en la base de datos.
 *
 * @param {Object} review - Datos de la reseña
 * @returns {Promise<ObjectId>} Id de la reseña insertada
 */
export async function crearReview(review) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("reviews");

  const resultado = await coleccion.insertOne(review);
  return resultado.insertedId;
}

/**
 * Devuelve las reseñas del usuario autenticado paginadas.
 *
 * @param {string} userId - Id del usuario autenticado
 * @param {number} page - Página actual
 * @param {number} limit - Número de reseñas por página
 * @returns {Promise<Object>} Reseñas y datos de paginación
 */
export async function leerReviewsPorUsuario(userId, page = 1, limit = 9) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("reviews");

  const filtro = { user: userId };

  const total = await coleccion.countDocuments(filtro);

  const reviews = await coleccion
    .find(filtro)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return {
    reviews,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Borra una reseña concreta del usuario autenticado.
 *
 * @param {string} reviewId - Id de la reseña
 * @param {string} userId - Id del usuario autenticado
 * @returns {Promise<number>} Número de documentos borrados
 */
export async function borrarReview(reviewId, userId) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("reviews");

  const resultado = await coleccion.deleteOne({
    _id: new ObjectId(reviewId),
    user: userId,
  });

  return resultado.deletedCount;
}

/**
 * Actualiza una reseña del usuario autenticado.
 *
 * @param {string} reviewId - Id de la reseña
 * @param {Object} updatedData - Nuevos datos de la reseña
 * @param {string} userId - Id del usuario autenticado
 * @returns {Promise<Object>} Información sobre si existía y si cambió
 */
export async function actualizarReview(reviewId, updatedData, userId) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("reviews");

  const resultado = await coleccion.updateOne(
    { _id: new ObjectId(reviewId), user: userId },
    { $set: updatedData }
  );

  return {
    existe: resultado.matchedCount,
    cambio: resultado.modifiedCount,
  };
}

/**
 * Devuelve una reseña concreta del usuario autenticado.
 *
 * @param {string} reviewId - Id de la reseña
 * @param {string} userId - Id del usuario autenticado
 * @returns {Promise<Object|null>} Reseña encontrada o null
 */
export async function leerReviewPorId(reviewId, userId) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("reviews");

  return await coleccion.findOne({
    _id: new ObjectId(reviewId),
    user: userId,
  });
}

/**
 * Busca un usuario por su id.
 *
 * @param {string} userId - Id del usuario autenticado
 * @returns {Promise<Object|null>} Usuario encontrado o null
 */
export async function buscarUsuarioPorId(userId) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("usuarios");

  return await coleccion.findOne({
    _id: new ObjectId(userId),
  });
}

/**
 * Actualiza los datos del usuario autenticado.
 *
 * @param {string} userId - Id del usuario autenticado
 * @param {Object} updatedData - Nuevos datos del usuario
 * @returns {Promise<Object>} Información sobre si existía y si cambió
 */
export async function actualizarUsuario(userId, updatedData) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("usuarios");

  const resultado = await coleccion.updateOne(
    { _id: new ObjectId(userId) },
    { $set: updatedData }
  );

  return {
    existe: resultado.matchedCount,
    cambio: resultado.modifiedCount,
  };
}

/**
 * Actualiza la contraseña del usuario autenticado.
 *
 * @param {string} userId - Id del usuario autenticado
 * @param {string} passwordHash - Nueva contraseña encriptada
 * @returns {Promise<Object>} Información sobre si existía y si cambió
 */
export async function actualizarPasswordUsuario(userId, passwordHash) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("usuarios");

  const resultado = await coleccion.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { password: passwordHash } }
  );

  return {
    existe: resultado.matchedCount,
    cambio: resultado.modifiedCount,
  };
}

/**
 * Devuelve las reseñas destacadas de otros usuarios para la sección Explorar.
 *
 * Permite aplicar un filtro opcional por ciudad y devuelve como máximo
 * 9 resultados ordenados por mejor nota y fecha más reciente.
 *
 * @param {string} userId - Id del usuario autenticado
 * @param {string} city - Ciudad por la que filtrar (opcional)
 * @returns {Promise<Array>} Lista de reseñas destacadas
 */
export async function leerReviewsExplorar(userId, city = "") {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("reviews");

  const filtro = {
    user: { $ne: userId },
  };

  if (city && city.trim()) {
    filtro.city = city;
  }

  return await coleccion
    .find(filtro)
    .sort({ rating: -1, createdAt: -1 })
    .limit(9)
    .toArray();
}