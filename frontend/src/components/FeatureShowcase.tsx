import React from 'react';
import { 
  Activity, Clock, Brain, Stethoscope, WifiOff, Users, Key, Sparkles 
} from 'lucide-react';

export const FeatureShowcase: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Complete Feature Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Engineered for clinical precision.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            An editorial bento architecture designed to connect hospitals, doctors, rural workers, and patients into one continuous healing network.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Living Digital Twin (Large 8 Cols) */}
          <div className="md:col-span-8 glass-panel p-8 rounded-3xl border border-teal-200 bg-white space-y-4 text-left flex flex-col justify-between hover:border-teal-400 transition shadow-sm">
            <div className="space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-teal-50 border border-teal-200 text-teal-700">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">Living Digital Twin</h3>
              <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                The flagship identity of every patient. Continuously recalculates Recovery Confidence Scores, calculates Recovery Drift Index, and glows in response to symptom parameters.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Update Speed</span>
                <span className="text-slate-900 font-bold font-mono">&lt; 500ms</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Telemetry</span>
                <span className="text-teal-700 font-bold">Bi-Directional</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Identity</span>
                <span className="text-emerald-700 font-bold">Patient Centric</span>
              </div>
            </div>
          </div>

          {/* Card 2: Explainable AI Intelligence (4 Cols) */}
          <div className="md:col-span-4 glass-panel p-8 rounded-3xl border border-purple-200 bg-white space-y-4 text-left flex flex-col justify-between hover:border-purple-300 transition shadow-sm">
            <div className="space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-purple-50 border border-purple-200 text-purple-700">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Recovery Intelligence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transparent causal AI. Answers "Why" confidence dropped and generates actionable clinical micro-recommendations.
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-[11px] font-mono font-bold text-purple-900">
              No black boxes. 100% explainable.
            </div>
          </div>

          {/* Card 3: Scrubbable Recovery Timeline (4 Cols) */}
          <div className="md:col-span-4 glass-panel p-6 rounded-3xl border border-slate-200 bg-white text-left space-y-3 hover:border-slate-300 transition shadow-2xs">
            <div className="p-2.5 w-fit rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Recovery Timeline</h3>
            <p className="text-xs text-slate-600">
              Scrubbable day-by-day milestone trajectory reflecting healing progress over 30 post-discharge days.
            </p>
          </div>

          {/* Card 4: Doctor Collaboration Dashboard (4 Cols) */}
          <div className="md:col-span-4 glass-panel p-6 rounded-3xl border border-slate-200 bg-white text-left space-y-3 hover:border-slate-300 transition shadow-2xs">
            <div className="p-2.5 w-fit rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Doctor Sync</h3>
            <p className="text-xs text-slate-600">
              Real-time clinician portal with instant priority alerts and prescription tweak tools.
            </p>
          </div>

          {/* Card 5: Offline SMS & IVR Recovery (4 Cols) */}
          <div className="md:col-span-4 glass-panel p-6 rounded-3xl border border-slate-200 bg-white text-left space-y-3 hover:border-slate-300 transition shadow-2xs">
            <div className="p-2.5 w-fit rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Offline Rural Recovery</h3>
            <p className="text-xs text-slate-600">
              Interactive SMS and IVR voice calls for feature phones. No internet or app installation required.
            </p>
          </div>

          {/* Card 6: ASHA Worker Network (6 Cols) */}
          <div className="md:col-span-6 glass-panel p-6 rounded-3xl border border-slate-200 bg-white text-left space-y-3 hover:border-slate-300 transition shadow-2xs">
            <div className="p-2.5 w-fit rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">ASHA Worker Network</h3>
            <p className="text-xs text-slate-600">
              Automated community task dispatch for inactive or high-risk rural patients, bringing healthcare to the doorstep.
            </p>
          </div>

          {/* Card 7: Doctor Discovery & Unique Doctor Code (6 Cols) */}
          <div className="md:col-span-6 glass-panel p-6 rounded-3xl border border-slate-200 bg-white text-left space-y-3 hover:border-slate-300 transition shadow-2xs">
            <div className="p-2.5 w-fit rounded-xl bg-teal-50 border border-teal-200 text-teal-700">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Doctor Code Binder</h3>
            <p className="text-xs text-slate-600">
              Instant pairing of discharge patients with hospital specialists using a unique 6-character Doctor Code.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
