import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { WhyTraditionalRecoveryFails } from './components/WhyTraditionalRecoveryFails';
import { LivingDigitalTwin } from './components/LivingDigitalTwin';
import { RecoveryTimeline } from './components/RecoveryTimeline';
import { DoctorSync } from './components/DoctorSync';
import { RecoveryIntelligence } from './components/RecoveryIntelligence';
import { DoctorDiscovery } from './components/DoctorDiscovery';
import { RuralHealthcare } from './components/RuralHealthcare';
import { AshaWorkerNetwork } from './components/AshaWorkerNetwork';
import { FeatureShowcase } from './components/FeatureShowcase';
import { Vision } from './components/Vision';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased overflow-x-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <WhyTraditionalRecoveryFails />
      <LivingDigitalTwin />
      <RecoveryTimeline />
      <DoctorSync />
      <RecoveryIntelligence />
      <DoctorDiscovery />
      <RuralHealthcare />
      <AshaWorkerNetwork />
      <FeatureShowcase />
      <Vision />
      <CTA />
      <Footer />
    </div>
  );
}
