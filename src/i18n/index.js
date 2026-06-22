import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./es.json";
import en from "./en.json";

const STORAGE_KEY = "kz-landing-lang";

const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: saved || "es",
  fallbackLng: "es",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
    localStorage.setItem(STORAGE_KEY, lng);
  }
});

export default i18n;
