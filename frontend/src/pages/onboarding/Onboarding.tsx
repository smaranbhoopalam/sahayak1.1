import React, { useState, useEffect } from 'react';
import { ProgressBar } from './ProgressBar';
import { NavigationButtons } from './NavigationButtons';
import { WelcomeStep } from './WelcomeStep';
import { RecoveryProfileStep } from './RecoveryProfileStep';
import { HealthInfoStep } from './HealthInfoStep';
import { RecoveryAccessStep } from './RecoveryAccessStep';
import { RecoveryBaselineStep } from './RecoveryBaselineStep';
import { RecoveryGoalsStep } from './RecoveryGoalsStep';
import { TwinGenerationStep } from './TwinGenerationStep';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  procedure: string;
  dischargeDate: string;
  bodyArea: string;
  conditions: string[];
  allergies: string[];
  medications: string[];
  painLevel: number;
  mobility: string;
  sleepQuality: string;
  appetite: string;
  goals: string[];
  customGoals: string[];
  // Connectivity preferences
  deviceType: string;
  internetAvailability: string;
  communicationMode: string;
  preferredLanguage: string;
  preferredContactTime: string;
}

const INITIAL_DATA: OnboardingData = {
  procedure: '',
  dischargeDate: new Date().toISOString().split('T')[0],
  bodyArea: '',
  conditions: [],
  allergies: [],
  medications: [],
  painLevel: 3,
  mobility: '',
  sleepQuality: '',
  appetite: '',
  goals: [],
  customGoals: [],
  deviceType: '',
  internetAvailability: '',
  communicationMode: '',
  preferredLanguage: 'English',
  preferredContactTime: '',
};

const STEPS = [
  { id: 'welcome', title: 'Welcome', description: 'Meet Sahayak' },
  { id: 'profile', title: 'Profile', description: 'Recovery Type' },
  { id: 'health', title: 'Health Info', description: 'Medical History' },
  { id: 'connectivity', title: 'Connectivity', description: 'Recovery Access' },
  { id: 'baseline', title: 'Baseline', description: 'Current State' },
  { id: 'goals', title: 'Goals', description: 'Targets' },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('sahayak_onboarding_data');
      const savedStep = localStorage.getItem('sahayak_onboarding_step');
      if (savedData) {
        setData(JSON.parse(savedData));
      }
      if (savedStep) {
        setCurrentStepIdx(parseInt(savedStep, 10));
      }
    } catch (e) {
      console.error('Failed to load onboarding cache:', e);
    }
  }, []);

  // Save to localStorage on data or step change
  useEffect(() => {
    try {
      localStorage.setItem('sahayak_onboarding_data', JSON.stringify(data));
      localStorage.setItem('sahayak_onboarding_step', currentStepIdx.toString());
    } catch (e) {
      console.error('Failed to save onboarding cache:', e);
    }
  }, [data, currentStepIdx]);

  const handleUpdate = (updatedFields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updatedFields }));
  };

  const handleNext = () => {
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      // Initiate twin generation phase
      setIsGenerating(true);
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const resetOnboarding = () => {
    setData(INITIAL_DATA);
    setCurrentStepIdx(0);
    setIsGenerating(false);
    localStorage.removeItem('sahayak_onboarding_data');
    localStorage.removeItem('sahayak_onboarding_step');
  };

  // Step validation rules
  const validateStep = (): boolean => {
    const stepId = STEPS[currentStepIdx]?.id;
    switch (stepId) {
      case 'welcome':
        return true;
      case 'profile':
        return !!data.procedure.trim() && !!data.dischargeDate && !!data.bodyArea;
      case 'health':
        // Optional parameters, can proceed
        return true;
      case 'connectivity':
        // All connectivity fields must be chosen
        return (
          !!data.deviceType &&
          !!data.internetAvailability &&
          !!data.communicationMode &&
          !!data.preferredLanguage &&
          !!data.preferredContactTime
        );
      case 'baseline':
        return !!data.mobility && !!data.sleepQuality && !!data.appetite;
      case 'goals':
        return data.goals.length > 0 || data.customGoals.length > 0;
      default:
        return false;
    }
  };

  if (isGenerating) {
    return (
      <TwinGenerationStep 
        onComplete={() => {
          // Clear cached state on successful completion
          localStorage.removeItem('sahayak_onboarding_data');
          localStorage.removeItem('sahayak_onboarding_step');
          onComplete(data);
        }}
      />
    );
  }

  const renderStepContent = () => {
    const stepId = STEPS[currentStepIdx]?.id;
    switch (stepId) {
      case 'welcome':
        return <WelcomeStep onStart={handleNext} />;
      case 'profile':
        return <RecoveryProfileStep data={data} onChange={handleUpdate} />;
      case 'health':
        return <HealthInfoStep data={data} onChange={handleUpdate} />;
      case 'connectivity':
        return <RecoveryAccessStep data={data} onChange={handleUpdate} />;
      case 'baseline':
        return <RecoveryBaselineStep data={data} onChange={handleUpdate} />;
      case 'goals':
        return <RecoveryGoalsStep data={data} onChange={handleUpdate} />;
      default:
        return null;
    }
  };

  const isWelcome = STEPS[currentStepIdx]?.id === 'welcome';

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans pt-24">
      
      {/* Main Body */}
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        
        {/* Progress Bar */}
        {!isWelcome && (
          <ProgressBar currentStep={currentStepIdx} steps={STEPS} />
        )}

        {/* Step Cards Container */}
        <div className="w-full flex-1 max-w-3xl mx-auto flex items-center justify-center">
          <div className="w-full">
            {renderStepContent()}
          </div>
        </div>

      </main>

      {/* Navigation Buttons footer */}
      {!isWelcome && (
        <div className="flex flex-col items-center gap-2 pb-6">
          <NavigationButtons
            onNext={handleNext}
            onBack={handleBack}
            canNext={validateStep()}
            canBack={currentStepIdx > 1}
            nextText={currentStepIdx === STEPS.length - 1 ? 'Build My Digital Twin' : 'Continue'}
          />
          <button
            onClick={resetOnboarding}
            className="text-[10px] text-slate-400 hover:text-rose-600 font-semibold transition cursor-pointer mt-1"
          >
            Reset Setup & Start Over
          </button>
        </div>
      )}

    </div>
  );
};
