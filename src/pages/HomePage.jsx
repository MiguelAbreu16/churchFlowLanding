import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import StickyMobileCta from "../components/common/StickyMobileCta";
import HeroSection from "../components/home/HeroSection";
import ChurchWalkSection from "../components/home/ChurchWalkSection";
import SocialProofSection from "../components/home/SocialProofSection";
import LiveDemosSection from "../components/home/LiveDemosSection";
import FeatureModulesSection from "../components/home/FeatureModulesSection";
import GrowthSection from "../components/home/GrowthSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import ProductTourSection from "../components/home/ProductTourSection";
import ValueCalculator from "../components/home/ValueCalculator";
import PricingSection from "../components/home/PricingSection";
import FAQSection from "../components/home/FAQSection";
import CTABanner from "../components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ChurchWalkSection />
        <SocialProofSection />
        <LiveDemosSection />
        <FeatureModulesSection />
        <GrowthSection />
        <HowItWorksSection />
        <ProductTourSection />
        <ValueCalculator />
        <PricingSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
