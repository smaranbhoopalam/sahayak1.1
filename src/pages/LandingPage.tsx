import React from 'react';
import { Hero } from '../components/smaran/Hero';
import { Problem } from '../components/smaran/Problem';
import { WhyTraditionalRecoveryFails } from '../components/smaran/WhyTraditionalRecoveryFails';
import { LivingDigitalTwin } from '../components/smaran/LivingDigitalTwin';
import { RecoveryTimeline } from '../components/smaran/RecoveryTimeline';
import { DoctorSync } from '../components/smaran/DoctorSync';
import { RecoveryIntelligence } from '../components/smaran/RecoveryIntelligence';
import { DoctorDiscovery } from '../components/smaran/DoctorDiscovery';
import { RuralHealthcare } from '../components/smaran/RuralHealthcare';
import { AshaWorkerNetwork } from '../components/smaran/AshaWorkerNetwork';
import { FeatureShowcase } from '../components/smaran/FeatureShowcase';
import { Vision } from '../components/smaran/Vision';
import { CTA } from '../components/smaran/CTA';
import { Footer } from '../components/smaran/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden">
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
};
