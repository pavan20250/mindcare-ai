import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ChallengesSection from '@/components/ChallengesSection';
import FeaturesSection from '@/components/FeaturesSection';
import PatientJourneySection from '@/components/PatientJourneySection';
import ClinicalScopeSection from '@/components/ClinicalScopeSection';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ChallengesSection />
      <FeaturesSection />
      <PatientJourneySection />
      <ClinicalScopeSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
