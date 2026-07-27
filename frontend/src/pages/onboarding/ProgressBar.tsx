import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  steps: {
    id: string;
    title: string;
    description: string;
  }[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* Stepper container */}
      <div className="relative flex items-center justify-between">
        
        {/* Track Line Background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-slate-200 rounded-full -z-10" />

        {/* Track Line Active Fill (Animated width) */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full -z-10"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />

        {/* Steps list */}
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center relative">
              {/* Step indicator circle with spring bounce */}
              <motion.div 
                animate={{
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                  isCompleted 
                    ? 'bg-teal-600 text-white shadow-[0_0_12px_rgba(20,184,166,0.25)]' 
                    : isActive 
                    ? 'bg-white border-2 border-teal-600 text-teal-700 shadow-[0_0_16px_rgba(20,184,166,0.18)]' 
                    : 'bg-white border border-slate-200 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <motion.svg 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  idx + 1
                )}
              </motion.div>

              {/* Title / Description */}
              <div className="absolute top-10 flex flex-col items-center w-28 sm:w-36 text-center select-none">
                <span 
                  className={`text-[10px] sm:text-xs font-semibold transition-colors duration-200 ${
                    isActive ? 'text-teal-700 font-bold' : isCompleted ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
                <span className="hidden md:block text-[8px] text-slate-500 mt-0.5 leading-tight font-medium">
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}

      </div>
      <div className="h-8" />
    </div>
  );
};
