import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./es.json";
import en from "./en.json";
import fr from "./fr.json";
import ht from "./ht.json";
import pt from "./pt.json";

const STORAGE_KEY = "kz-landing-lang";
const SUPPORTED = ["es", "en", "pt", "fr", "ht"];

const saved =
  typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
const initialLng = SUPPORTED.includes(saved) ? saved : "es";

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
    pt: { translation: pt },
    fr: { translation: fr },
    ht: { translation: ht },
  },
  lng: initialLng,
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
