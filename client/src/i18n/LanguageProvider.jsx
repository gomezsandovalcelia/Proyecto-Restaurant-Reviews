import { useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { getStoredLanguage, translate } from "./translations";

/**
 * LanguageProvider.jsx
 * Proveedor del idioma de la aplicación.
 *
 * Guarda el idioma elegido en localStorage para mantenerlo
 * al recargar la página y ofrece la función t() para traducir textos.
 */

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getStoredLanguage);

  /**
   * Guarda el idioma y actualiza el atributo lang del documento
   * cada vez que el usuario lo cambia.
   */
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  /**
   * Alterna entre español e inglés.
   */
  function toggleLanguage() {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  }

  /**
   * Traduce una clave al idioma actual.
   */
  function t(key, params) {
    return translate(lang, key, params);
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
