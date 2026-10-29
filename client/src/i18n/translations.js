/**
 * translations.js
 * Textos de la interfaz en los idiomas disponibles.
 *
 * Cada idioma tiene las mismas claves, agrupadas por pantalla.
 * Los textos con {variable} se rellenan al traducir.
 */

const translations = {
  es: {
    common: {
      allFieldsRequired: "Todos los campos son obligatorios",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Borrar",
      username: "Usuario",
      email: "Email",
      password: "Contraseña",
      usernamePlaceholder: "Introduce tu usuario",
      passwordPlaceholder: "Introduce tu contraseña",
      loadingReviews: "Cargando reseñas...",
      loadingProfile: "Cargando perfil...",
    },
    review: {
      restaurantName: "Nombre del restaurante",
      city: "Ciudad",
      selectCity: "Selecciona una ciudad",
      location: "Ubicación",
      rating: "Nota",
      dish: "Plato que repetirías",
      recommendedDish: "Plato recomendado",
      noCity: "Sin ciudad",
      restaurantPlaceholder: "Ej. Goiko",
      locationPlaceholder: "Ej. Murcia centro",
      ratingPlaceholder: "Ej. 8",
      dishPlaceholder: "Ej. Raviolis de trufa",
    },
    navbar: {
      home: "Home",
      createReview: "Crear reseña",
      explore: "Explorar",
      profile: "Perfil",
      logout: "Cerrar sesión",
    },
    login: {
      subtitle: "Inicia sesión para continuar",
      submit: "Iniciar sesión",
      noAccount: "¿No tienes cuenta?",
      goToRegister: "Ir a registro",
    },
    register: {
      subtitle: "Crea tu cuenta para empezar",
      username: "Nombre de usuario",
      email: "Correo electrónico",
      emailPlaceholder: "Introduce tu correo",
      confirmPassword: "Confirmar contraseña",
      confirmPasswordPlaceholder: "Repite tu contraseña",
      passwordsDontMatch: "Las contraseñas no coinciden",
      success: "Usuario registrado correctamente",
      submit: "Registrarse",
      haveAccount: "¿Ya tienes cuenta?",
      goToLogin: "Ir a login",
    },
    userHome: {
      title: "Mis reseñas",
      subtitle: "Aquí puedes ver y gestionar todos los restaurantes que has guardado.",
      emptyTitle: "Todavía no tienes reseñas",
      emptyText: "Empieza guardando tu primera experiencia en un restaurante.",
      sortDate: "Fecha",
      sortRating: "Nota",
      previous: "Anterior",
      next: "Siguiente",
      page: "Página {current} de {total}",
      confirmDeleteTitle: "Confirmar borrado",
      confirmDeleteText: "¿Seguro que quieres borrar la reseña de",
    },
    createReview: {
      title: "Crear reseña",
      subtitle: "Añade un restaurante y guarda tu experiencia.",
      submit: "Guardar reseña",
    },
    editReview: {
      title: "Editar reseña",
      subtitle: "Modifica los datos de tu reseña y guarda los cambios.",
      loading: "Cargando reseña...",
      submit: "Guardar cambios",
    },
    explore: {
      title: "Explorar",
      subtitle: "Descubre las mejores reseñas de otros usuarios.",
      filterByCity: "Filtrar por ciudad",
      allCities: "Todas las ciudades",
      emptyTitle: "No hay reseñas para mostrar",
      emptyText: "Prueba con otra ciudad o espera a que otros usuarios publiquen reseñas.",
    },
    profile: {
      title: "Perfil",
      subtitle: "Aquí puedes ver la información de tu cuenta.",
      language: "Idioma",
      editProfile: "Editar perfil",
    },
    editProfile: {
      title: "Editar perfil",
      subtitle: "Modifica tu usuario, tu correo y tu contraseña.",
      accountData: "Datos de la cuenta",
      saveData: "Guardar datos",
      back: "Volver",
      success: "Perfil actualizado correctamente",
      changePassword: "Cambiar contraseña",
      currentPassword: "Contraseña actual",
      newPassword: "Nueva contraseña",
      confirmNewPassword: "Confirmar nueva contraseña",
      allPasswordFieldsRequired: "Todos los campos de contraseña son obligatorios",
      passwordsDontMatch: "Las nuevas contraseñas no coinciden",
      passwordSuccess: "Contraseña actualizada correctamente",
    },
    errors: {
      register: "Error al registrar usuario",
      login: "Error al iniciar sesión",
      getProfile: "Error al obtener el perfil",
      updateProfile: "Error al actualizar el perfil",
      updatePassword: "Error al cambiar la contraseña",
      createReview: "Error al crear la reseña",
      getReviews: "Error al obtener las reseñas",
      deleteReview: "Error al borrar la reseña",
      updateReview: "Error al actualizar la reseña",
      getReview: "Error al obtener la reseña",
      getExplore: "Error al obtener las reseñas de explorar",
    },
  },

  en: {
    common: {
      allFieldsRequired: "All fields are required",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      username: "Username",
      email: "Email",
      password: "Password",
      usernamePlaceholder: "Enter your username",
      passwordPlaceholder: "Enter your password",
      loadingReviews: "Loading reviews...",
      loadingProfile: "Loading profile...",
    },
    review: {
      restaurantName: "Restaurant name",
      city: "City",
      selectCity: "Select a city",
      location: "Location",
      rating: "Rating",
      dish: "Dish you would order again",
      recommendedDish: "Recommended dish",
      noCity: "No city",
      restaurantPlaceholder: "E.g. Goiko",
      locationPlaceholder: "E.g. Murcia city centre",
      ratingPlaceholder: "E.g. 8",
      dishPlaceholder: "E.g. Truffle ravioli",
    },
    navbar: {
      home: "Home",
      createReview: "Create review",
      explore: "Explore",
      profile: "Profile",
      logout: "Log out",
    },
    login: {
      subtitle: "Log in to continue",
      submit: "Log in",
      noAccount: "Don't have an account?",
      goToRegister: "Sign up",
    },
    register: {
      subtitle: "Create your account to get started",
      username: "Username",
      email: "Email",
      emailPlaceholder: "Enter your email",
      confirmPassword: "Confirm password",
      confirmPasswordPlaceholder: "Repeat your password",
      passwordsDontMatch: "Passwords do not match",
      success: "User registered successfully",
      submit: "Sign up",
      haveAccount: "Already have an account?",
      goToLogin: "Go to login",
    },
    userHome: {
      title: "My reviews",
      subtitle: "Here you can view and manage all the restaurants you have saved.",
      emptyTitle: "You don't have any reviews yet",
      emptyText: "Start by saving your first restaurant experience.",
      sortDate: "Date",
      sortRating: "Rating",
      previous: "Previous",
      next: "Next",
      page: "Page {current} of {total}",
      confirmDeleteTitle: "Confirm deletion",
      confirmDeleteText: "Are you sure you want to delete the review for",
    },
    createReview: {
      title: "Create review",
      subtitle: "Add a restaurant and save your experience.",
      submit: "Save review",
    },
    editReview: {
      title: "Edit review",
      subtitle: "Update your review details and save the changes.",
      loading: "Loading review...",
      submit: "Save changes",
    },
    explore: {
      title: "Explore",
      subtitle: "Discover the best reviews from other users.",
      filterByCity: "Filter by city",
      allCities: "All cities",
      emptyTitle: "No reviews to show",
      emptyText: "Try another city or wait for other users to post reviews.",
    },
    profile: {
      title: "Profile",
      subtitle: "Here you can see your account information.",
      language: "Language",
      editProfile: "Edit profile",
    },
    editProfile: {
      title: "Edit profile",
      subtitle: "Update your username, email and password.",
      accountData: "Account details",
      saveData: "Save details",
      back: "Back",
      success: "Profile updated successfully",
      changePassword: "Change password",
      currentPassword: "Current password",
      newPassword: "New password",
      confirmNewPassword: "Confirm new password",
      allPasswordFieldsRequired: "All password fields are required",
      passwordsDontMatch: "The new passwords do not match",
      passwordSuccess: "Password updated successfully",
    },
    errors: {
      register: "Error registering user",
      login: "Error logging in",
      getProfile: "Error fetching profile",
      updateProfile: "Error updating profile",
      updatePassword: "Error changing password",
      createReview: "Error creating review",
      getReviews: "Error fetching reviews",
      deleteReview: "Error deleting review",
      updateReview: "Error updating review",
      getReview: "Error fetching review",
      getExplore: "Error fetching explore reviews",
    },
  },
};

/**
 * Idiomas disponibles y idioma por defecto.
 */
export const LANGUAGES = ["es", "en"];
export const DEFAULT_LANGUAGE = "es";

/**
 * Devuelve el idioma guardado en localStorage o el idioma por defecto.
 *
 * @returns {string} Código del idioma ("es" o "en")
 */
export function getStoredLanguage() {
  const lang = localStorage.getItem("lang");
  return LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
}

/**
 * Traduce una clave del tipo "login.subtitle" al idioma indicado.
 *
 * Si la clave no existe, devuelve la propia clave.
 *
 * @param {string} lang - Código del idioma
 * @param {string} key - Clave del texto
 * @param {Object} params - Valores para sustituir {variable} en el texto
 * @returns {string} Texto traducido
 */
export function translate(lang, key, params = {}) {
  const text = key
    .split(".")
    .reduce((obj, part) => (obj ? obj[part] : undefined), translations[lang]);

  if (typeof text !== "string") {
    return key;
  }

  return text.replace(/\{(\w+)\}/g, (match, name) =>
    params[name] !== undefined ? params[name] : match
  );
}
