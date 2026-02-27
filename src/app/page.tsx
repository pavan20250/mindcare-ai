import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ChallengesSection from '@/components/ChallengesSection';
import FeaturesSection from '@/components/FeaturesSection';
import PatientJourneySection from '@/components/PatientJourneySection';
import ClinicalScopeSection from '@/components/ClinicalScopeSection';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import NeuralNetworkBg from '@/components/NeuralNetworkBg';

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
          <PatientJourneySection />
          <ClinicalScopeSection />
          <BenefitsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
