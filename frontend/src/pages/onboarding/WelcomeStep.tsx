import React from 'react';
import logo from "@/assets/logo.png";
import { ShieldCheck, Heart, Sparkles, Activity } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      
      {/* Healing Icon Group */}
      <div className="relative inline-flex items-center justify-center">
        <div className="absolute -inset-4 bg-teal-600/5 rounded-full blur-xl animate-pulse"></div>
        <img
          src={logo}
          alt="Sahayak Logo"
          className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Main Greeting */}
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Welcome to <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Sahayak</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
          Let's create your Live Digital Twin so your care team can stay connected to your recovery progress, even after you leave the hospital.
        </p>
      </div>

      {/* Why it matters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left pt-2">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
            <Heart className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Personalized Recovery</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Your Digital Twin learns from your daily logs to tailor recommendations specifically for your body's recovery speed.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Doctor Sync</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            If recovery shifts from the target path, your doctor is automatically notified with explainable telemetry insights.
          </p>
        </div>
      </div>

      {/* Info note */}
      <div className="pt-2 text-slate-500 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs font-semibold">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Takes ~2 minutes
        </span>
        <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300" />
        <span>No complex clinical jargon</span>
      </div>

      {/* Button */}
      <div className="pt-4">
        <button
          onClick={onStart}
          type="button"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold px-8 py-3 rounded-full text-sm transition-all duration-300 shadow-md shadow-teal-600/10 hover:shadow-teal-650/30 cursor-pointer"
        >
          <span>Build My Twin</span>
          <svg className="w-4 h-4 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

    </div>
  );
};
