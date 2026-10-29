import { createContext, useContext } from "react";

/**
 * LanguageContext.js
 * Contexto que comparte el idioma actual con toda la aplicación.
 */
export const LanguageContext = createContext(null);

/**
 * Hook para acceder al idioma actual desde cualquier componente.
 *
 * @returns {{ lang: string, toggleLanguage: Function, t: Function }}
 */
export function useLanguage() {
  return useContext(LanguageContext);
}
