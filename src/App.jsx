import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import RegisterPage from "./pages/RegisterPage";
import SuccessPage from "./pages/SuccessPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/legal/terminos" element={<TermsPage />} />
        <Route path="/legal/privacidad" element={<PrivacyPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
