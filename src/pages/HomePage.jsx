import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HeroSection from "../components/home/HeroSection";
import SocialProofSection from "../components/home/SocialProofSection";
import FeatureModulesSection from "../components/home/FeatureModulesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import ProductTourSection from "../components/home/ProductTourSection";
import PricingSection from "../components/home/PricingSection";
import FAQSection from "../components/home/FAQSection";
import CTABanner from "../components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <FeatureModulesSection />
        <HowItWorksSection />
        <ProductTourSection />
        <PricingSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
