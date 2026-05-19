import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";

export default function HomePage() {
  return (
    <main className="flex-grow">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
    </main>
  );
}