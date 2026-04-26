
/**
 * index.js
 * Archivo principal de la API Express.
 *
 * Este archivo configura el servidor, los middlewares globales
 * y los endpoints principales de la aplicación.
 *
 * Funcionalidades principales de la API:
 * - Registro de usuarios
 * - Inicio de sesión y generación de token JWT
 * - Obtención y edición del perfil del usuario autenticado
 * - Cambio de contraseña
 * - Creación, lectura, edición y borrado de reseñas
 * - Consulta de reseñas destacadas en la sección Explorar
 *
 * Middlewares globales:
 * - cors: permite peticiones desde el frontend
 * - express.json: permite recibir y procesar cuerpos en formato JSON
 *
 * Protección de rutas:
 * - Las rutas privadas utilizan el middleware verificarToken
 *   para comprobar la autenticación del usuario.
 */

import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8", "8.8.4.4"]);

import jwt from "jsonwebtoken";

/**
 * Instancia principal del servidor Express.
 */
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import {
  buscarUsuarioPorNombre,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  crearUsuario,
  crearReview,
  leerReviewsPorUsuario,
  leerReviewPorId,
  leerReviewsExplorar,
  borrarReview,
  actualizarReview,
  actualizarUsuario,
  actualizarPasswordUsuario,
} from "./db.js";

const servidor = express();

servidor.use(cors());
servidor.use(express.json());


/**
 * Endpoint de registro.
 *
 * Recibe username, email y password.
 * Comprueba que los campos estén completos, valida que el usuario
 * y el email no existan ya y guarda el nuevo usuario con la contraseña encriptada.
 */
servidor.post("/register", async (peticion, respuesta) => {
    try {
        const { username, email, password } = peticion.body;

        if (!username || !username.trim() || !email || !email.trim() || !password || !password.trim()) {
            return respuesta.status(400).json({error: "Todos los campos son obligatorios",});
        }

        const usuarioExistente = await buscarUsuarioPorNombre(username);
        if (usuarioExistente) {
            return respuesta.status(409).json({error: "Ese nombre de usuario ya existe", });
        }

        const emailExistente = await buscarUsuarioPorEmail(email);
        if (emailExistente) {
            return respuesta.status(409).json({error: "Ese correo ya está registrado", });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const id = await crearUsuario({username,email, password: passwordHash, createdAt: new Date(),});

        respuesta.status(201).json({ message: "Usuario registrado correctamente", id, });
    } catch (error) {
        console.error(error);
        respuesta.status(500).json({ error: "Error en el servidor", });
    }
});

/**
 * Endpoint de login.
 *
 * Recibe username y password.
 * Comprueba que las credenciales sean válidas y, si lo son,
 * genera un token JWT que permitirá acceder a las rutas privadas.
 */
servidor.post("/login", async (peticion, respuesta) => {
    try {
        const { username, password } = peticion.body;

        if (!username || !username.trim() || !password || !password.trim()) {
            return respuesta.status(400).json({error: "Usuario y contraseña obligatorios",});
        }

        const usuarioEncontrado = await buscarUsuarioPorNombre(username);

        if (!usuarioEncontrado) {
          return respuesta.status(401).json({error: "Credenciales incorrectas",});
        }

        const coincidePassword = await bcrypt.compare( password, usuarioEncontrado.password);

        if (!coincidePassword) { return respuesta.status(401).json({ error: "Credenciales incorrectas",});
        }

        const token = jwt.sign(
            { id: usuarioEncontrado._id, username: usuarioEncontrado.username },
            process.env.SECRET
        );

        respuesta.json({
            message: "Login correcto",
            token,
        });
    } catch (error) {
        console.error(error);
        respuesta.status(500).json({
            error: "Error en el servidor",
        });
    }
});

/**
 * Middleware de verificación de token.
 *
 * Comprueba que la petición incluya un JWT válido.
 * Si el token es correcto, guarda los datos del usuario autenticado
 * en el objeto de la petición para que puedan usarse en rutas privadas.
 */
function verificarToken(peticion, respuesta, siguiente) {
  const authHeader = peticion.headers.authorization;

  if (!authHeader) {
    return respuesta.status(403).json({
      error: "Token requerido",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const datos = jwt.verify(token, process.env.SECRET);
    peticion.usuario = datos;
    siguiente();
  } catch (error) {
    return respuesta.status(403).json({
      error: "Token inválido",
    });
  }
}

/**
 * Endpoint para obtener los datos del usuario autenticado.
 *
 * Requiere token.
 * Devuelve username y email del usuario logueado.
 */
servidor.get("/profile", verificarToken, async (peticion, respuesta) => {
  try {
    const usuario = await buscarUsuarioPorId(String(peticion.usuario.id));

    if (!usuario) {
      return respuesta.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    respuesta.json({
      username: usuario.username,
      email: usuario.email,
    });
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({
      error: "Error en el servidor",
    });
  }
});


/**
 * Endpoint para crear una nueva reseña.
 *
 * Requiere token.
 * Guarda una reseña asociada al usuario autenticado.
 */
servidor.post("/reviews", verificarToken, async (peticion, respuesta) => {
  try {
    const { restaurantName, city, location, rating, dish } = peticion.body;

    if (!restaurantName || !restaurantName.trim() || !city || !city.trim() || !location || !location.trim() || rating === undefined || !dish || !dish.trim()) {
      return respuesta.status(400).json({error: "Todos los campos son obligatorios", });
    }

    const review = {
      restaurantName,
      city,
      location,
      rating: Number(rating),
      dish,
      user: String(peticion.usuario.id),
      createdAt: new Date(),
    };

    const id = await crearReview(review);

    respuesta.status(201).json({
      message: "Reseña creada correctamente",
      id,
    });
    
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({
      error: "Error en el servidor",
    });
  }
});

/**
 * Endpoint para obtener las reseñas del usuario autenticado.
 *
 * Requiere token.
 * Devuelve las reseñas paginadas.
 */
servidor.get("/reviews", verificarToken, async (peticion, respuesta) => {
  try {
    const page = Number(peticion.query.page) || 1;

    const resultado = await leerReviewsPorUsuario(
      String(peticion.usuario.id),
      page,
      9
    );

    respuesta.json(resultado);
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({
      error: "Error en el servidor",
    });
  }
});

/**
 * Endpoint para borrar una reseña del usuario autenticado.
 *
 * Requiere token.
 * Solo permite borrar reseñas que pertenezcan al usuario logueado.
 */
servidor.delete("/reviews/:id", verificarToken, async (peticion, respuesta) => {
  try {
    const cantidadBorrada = await borrarReview(
      peticion.params.id,
      String(peticion.usuario.id)
    );

    if (!cantidadBorrada) {
      return respuesta.status(404).json({
        error: "Reseña no encontrada",
      });
    }

    respuesta.status(204).send();
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({
      error: "Error en el servidor",
    });
  }
});


/**
 * Endpoint para editar una reseña del usuario autenticado.
 *
 * Requiere token.
 * Solo permite editar reseñas que pertenezcan al usuario logueado.
 */
servidor.patch("/reviews/:id", verificarToken, async (peticion, respuesta) => {
  try {
    const { restaurantName, city, location, rating, dish } = peticion.body;

    if (
      !restaurantName ||
      !restaurantName.trim() ||
      !city ||
      !city.trim() ||
      !location ||
      !location.trim() ||
      rating === undefined ||
      !dish ||
      !dish.trim()
    ) {
      return respuesta.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    const resultado = await actualizarReview(
      peticion.params.id,
      {
        restaurantName,
        city,
        location,
        rating: Number(rating),
        dish,
      },
      String(peticion.usuario.id)
    );

    if (!resultado.existe) {
      return respuesta.status(404).json({
        error: "Reseña no encontrada",
      });
    }

    if (!resultado.cambio) {
      return respuesta.json({
        message: "No se realizaron cambios",
      });
    }

    respuesta.json({
      message: "Reseña actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({
      error: "Error en el servidor",
    });
  }
});

/**
 * Endpoint para obtener una reseña concreta del usuario autenticado.
 *
 * Requiere token.
 */
servidor.get("/reviews/:id", verificarToken, async (peticion, respuesta) => {
  try {
    const review = await leerReviewPorId(
      peticion.params.id,
      String(peticion.usuario.id)
    );

    if (!review) {
      return respuesta.status(404).json({
        error: "Reseña no encontrada",
      });
    }

    respuesta.json(review);
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({
      error: "Error en el servidor",
    });
  }
});

/**
 * Endpoint para editar el perfil del usuario autenticado.
 *
 * Requiere token.
 * Permite actualizar username y email comprobando que no estén repetidos.
 */
servidor.patch("/profile", verificarToken, async (peticion, respuesta) => {
  try {
    const { username, email } = peticion.body;

    if (!username || !username.trim() || !email || !email.trim()) {
      return respuesta.status(400).json({
        error: "Usuario y email son obligatorios",
      });
    }

    const userId = String(peticion.usuario.id);

    const usuarioActual = await buscarUsuarioPorId(userId);

    if (!usuarioActual) {
      return respuesta.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    const usuarioConEseNombre = await buscarUsuarioPorNombre(username);
    if (
      usuarioConEseNombre &&
      String(usuarioConEseNombre._id) !== userId
    ) {
      return respuesta.status(409).json({
        error: "Ese nombre de usuario ya existe",
      });
    }

    const usuarioConEseEmail = await buscarUsuarioPorEmail(email);
    if (
      usuarioConEseEmail &&
      String(usuarioConEseEmail._id) !== userId
    ) {
      return respuesta.status(409).json({
        error: "Ese email ya está registrado",
      });
    }

    const resultado = await actualizarUsuario(userId, {
      username,
      email,
    });

    if (!resultado.existe) {
      return respuesta.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    respuesta.json({
      message: "Perfil actualizado correctamente",
    });
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({
      error: "Error en el servidor",
    });
  }
});

/**
 * Endpoint para cambiar la contraseña del usuario autenticado.
 *
 * Requiere token.
 * Comprueba que la contraseña actual sea correcta y guarda la nueva encriptada.
 */
servidor.patch("/profile/password", verificarToken, async (peticion, respuesta) => {
  try {
    const { currentPassword, newPassword } = peticion.body;

    if (
      !currentPassword ||
      !currentPassword.trim() ||
      !newPassword ||
      !newPassword.trim()
    ) {
      return respuesta.status(400).json({
        error: "Todos los campos de contraseña son obligatorios",
      });
    }

    const userId = String(peticion.usuario.id);

    const usuarioActual = await buscarUsuarioPorId(userId);

    if (!usuarioActual) {
      return respuesta.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    const coincidePassword = await bcrypt.compare(
      currentPassword,
      usuarioActual.password
    );

    if (!coincidePassword) {
      return respuesta.status(401).json({
        error: "La contraseña actual no es correcta",
      });
    }

    const nuevaPasswordHash = await bcrypt.hash(newPassword, 10);

    await actualizarPasswordUsuario(userId, nuevaPasswordHash);

    respuesta.json({
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({
      error: "Error en el servidor",
    });
  }
});

/**
 * Endpoint para obtener reseñas destacadas de otros usuarios.
 *
 * Requiere token.
 * Permite filtrar por ciudad mediante query string.
 */
servidor.get("/explore", verificarToken, async (peticion, respuesta) => {
  try {
    const city = peticion.query.city || "";
    const userId = String(peticion.usuario.id);

    const reviews = await leerReviewsExplorar(userId, city);

    respuesta.json(reviews);
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({
      error: "Error en el servidor",
    });
  }
});

/**
 * Middleware final para rutas no encontradas.
 *
 * Se ejecuta cuando ninguna de las rutas anteriores coincide
 * con la petición realizada por el cliente.
 */
servidor.use((peticion, respuesta) => {
    respuesta.status(404).json({
        error: "Recurso no encontrado",
    });
});


servidor.get("/", (peticion, respuesta) => {
  respuesta.json({
    message: "API funcionando correctamente",
  });
});

/**
 * Inicia el servidor Express en el puerto definido en las variables de entorno.
 */
servidor.listen(process.env.PORT);