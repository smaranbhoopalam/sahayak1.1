import React from 'react';

export const Vision: React.FC = () => {
  return (
    <section id="vision" className="py-32 bg-slate-50 border-t border-slate-200 relative overflow-hidden text-left">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-teal-200/20 via-emerald-200/20 to-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <span className="text-xs uppercase font-bold tracking-widest text-teal-700 block font-mono">
          OUR MANIFESTO & VISION
        </span>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-slate-900 tracking-tight leading-[1.08]">
          We believe recovery should be <br />
          <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 bg-clip-text text-transparent">
            seen, continuous, and equitable.
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg sm:text-xl text-slate-700 font-light leading-relaxed pt-4">
          <p>
            For decades, healthcare celebrated discharge as a finish line. But discharge is just the threshold where real human recovery begins. No patient should ever suffer silently at home because a complication went unnoticed for two weeks.
          </p>

          <p>
            By building a Living Digital Twin for every individual—whether in a city high-rise or a remote village—we turn post-discharge healthcare into an uninterrupted, intelligent pulse of care.
          </p>
        </div>

        <div className="pt-8 border-t border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            S
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-heading">The Sahayak Vision</h4>
            <p className="text-xs text-slate-500 font-medium">Reinventing the 30-day post-discharge care window for humanity</p>
          </div>
        </div>

      </div>
    </section>
  );
};
