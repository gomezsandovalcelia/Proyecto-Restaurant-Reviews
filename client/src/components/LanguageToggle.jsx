import { useLanguage } from "../i18n/LanguageContext";

/**
 * LanguageToggle.jsx
 * Botón para cambiar el idioma de la aplicación entre español e inglés.
 *
 * Muestra los dos idiomas y resalta el que está activo.
 */

function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      className="btn language-toggle"
      onClick={toggleLanguage}
      aria-label={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
    >
      <span className={lang === "es" ? "active" : ""}>ES</span>
      <span className="language-toggle-separator">|</span>
      <span className={lang === "en" ? "active" : ""}>EN</span>
    </button>
  );
}

export default LanguageToggle;
