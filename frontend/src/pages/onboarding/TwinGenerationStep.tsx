import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TwinGenerationStepProps {
  onComplete: () => void;
}

const GENERATION_PHASES = [
  { id: 'profile', text: 'Analysing recovery profile...' },
  { id: 'protocol', text: 'Loading recovery protocol...' },
  { id: 'baseline', text: 'Building baseline recovery model...' },
  { id: 'recommendations', text: 'Personalising recommendations...' },
  { id: 'ready', text: 'Living Digital Twin Ready' },
];

export const TwinGenerationStep: React.FC<TwinGenerationStepProps> = ({ onComplete }) => {
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);

  useEffect(() => {
    if (currentPhaseIdx < GENERATION_PHASES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPhaseIdx(prev => prev + 1);
      }, 1500); // 1.5 seconds per phase
      return () => clearTimeout(timer);
    } else {
      // Completed, navigate to Recovery Twin dashboard after a short delay
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 1800);
      return () => clearTimeout(finalTimer);
    }
  }, [currentPhaseIdx, onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-50 p-6 font-sans">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* Animated Telemetry Symbol */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute -inset-4 bg-teal-600/5 rounded-full blur-xl animate-pulse"></div>
          <div className="w-20 h-20 rounded-3xl bg-white border border-teal-200 flex items-center justify-center text-teal-600 shadow-md relative z-10">
            <Cpu className="w-10 h-10 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Generating Your Twin</h2>
          <p className="text-xs text-slate-500 font-semibold">
            Calibrating biological algorithms to create your remote monitoring portrait...
          </p>
        </div>

        {/* Phase checklist */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl text-left space-y-4 shadow-sm">
          {GENERATION_PHASES.map((phase, idx) => {
            const isDone = idx < currentPhaseIdx;
            const isActive = idx === currentPhaseIdx;
            const isPending = idx > currentPhaseIdx;

            return (
              <div 
                key={phase.id} 
                className={`flex items-center justify-between text-sm transition-all duration-300 ${
                  isActive ? 'text-teal-700 font-bold scale-105 origin-left' : isDone ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isActive ? (
                    <div className="relative flex items-center justify-center shrink-0">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-teal-600 border-t-transparent animate-spin" />
                    </div>
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-200 bg-slate-50 shrink-0" />
                  )}
                  <span className="font-semibold">{phase.text}</span>
                </div>

                {isDone && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600">
                    Done
                  </span>
                )}
                {isActive && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-teal-600 animate-pulse">
                    Running
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Secure badge */}
        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs pt-4 border-t border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">Encrypted patient biometric vault</span>
        </div>

      </div>
    </div>
  );
};
