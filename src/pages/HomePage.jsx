import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import PricingSection from "../components/home/PricingSection";
import CTABanner from "../components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
