import React from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="py-28 bg-white border-t border-slate-200 relative overflow-hidden text-center">
      {/* Radial soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-2xs">
          <HeartHandshake className="w-4 h-4 text-teal-600" />
          The Future of Intelligent Healthcare
        </div>

        {/* Powerful Tagline & Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-slate-900 tracking-tight leading-[1.15]">
          Transform Post-Discharge Recovery Into <span className="text-teal-600 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Continuous Care</span>.
        </h2>

        {/* Subheading Tagline */}
        <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
          Empower patients, prevent hospital readmissions, and connect clinical care teams in real time with AI-driven Living Digital Twin intelligence.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              /* Action handler for Get Started - to be assigned later */
            }}
            className="flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-teal-600/20 hover:shadow-teal-600/35 border-0 cursor-pointer group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#doctor-discovery"
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold px-7 py-3.5 rounded-full text-sm border border-slate-200/90 transition duration-200"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Connect via Doctor Code</span>
          </a>
        </div>

        {/* Compliance Footer Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-xs text-slate-500 font-medium border-t border-slate-200">
          <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> HIPAA & Clinical Privacy Compliant
          </span>
          <span className="h-3 w-px bg-slate-200 hidden sm:inline"></span>
          <span>Zero App Install SMS/IVR Fallback</span>
          <span className="h-3 w-px bg-slate-200 hidden sm:inline"></span>
          <span>EMR & Hospital EHR Ready</span>
        </div>

      </div>
    </section>
  );
};
