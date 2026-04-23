/**
 * db.js
 * Funciones de acceso a datos para la colección de usuarios.
 *
 * Este archivo centraliza la conexión con MongoDB y las operaciones
 * relacionadas con la colección "usuarios".
 */


import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8", "8.8.4.4"]);

import { MongoClient, ObjectId } from "mongodb";

const urlMongo = process.env.MONGO_URL;
let client;

async function conectar() {
  if (!client) {
    client = new MongoClient(urlMongo);
    await client.connect();
  }

  return client;
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
 * Devuelve las reseñas de un usuario.
 *
 * @param {string} userId - Id del usuario autenticado
 * @returns {Promise<Array>} Lista de reseñas del usuario
 */
export async function leerReviewsPorUsuario(userId) {
  const conexion = await conectar();
  const coleccion = conexion.db("restaurant_reviews").collection("reviews");

  return await coleccion.find({ user: userId }).toArray();
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


