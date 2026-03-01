import Navbar from '@/components/website/Navbar';
import HeroSection from '@/components/website/HeroSection';
import ChallengesSection from '@/components/website/ChallengesSection';
import FeaturesSection from '@/components/website/FeaturesSection';
import ClinicalScopeSection from '@/components/website/ClinicalScopeSection';
import BenefitsSection from '@/components/website/BenefitsSection';
import CTASection from '@/components/website/CTASection';
import Footer from '@/components/website/Footer';
import NeuralNetworkBg from '@/components/website/NeuralNetworkBg';

export default function Home() {
  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <NeuralNetworkBg nodeCount={90} connectionDist={180} />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <ChallengesSection />
          <FeaturesSection />
          <ClinicalScopeSection />
          <BenefitsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
