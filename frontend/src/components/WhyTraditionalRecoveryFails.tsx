import React from 'react';
import { AlertCircle } from 'lucide-react';

export const WhyTraditionalRecoveryFails: React.FC = () => {
  return (
    <section id="why-it-fails" className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            Anatomy of a Failure Loop
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Why traditional post-discharge care breaks down.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Without continuous feedback loops, minor recovery hiccups compound into avoidable emergency readmissions.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          
          {/* Traditional Failure Cascade */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-widest text-rose-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              The Broken Chain (Traditional Approach)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="glass-panel p-5 rounded-2xl border border-rose-200 bg-white text-left space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 font-bold text-xs">
                  01
                </div>
                <h4 className="text-sm font-bold text-slate-900">Patient Misses Dosage</h4>
                <p className="text-xs text-slate-600">Patient gets confused by complex prescription schedules at home.</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-rose-200 bg-white text-left space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 font-bold text-xs">
                  02
                </div>
                <h4 className="text-sm font-bold text-slate-900">Doctor Has No Visibility</h4>
                <p className="text-xs text-slate-600">The clinical team has zero telemetry into adherence or daily pain.</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-rose-200 bg-white text-left space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 font-bold text-xs">
                  03
                </div>
                <h4 className="text-sm font-bold text-slate-900">Symptoms Worsen</h4>
                <p className="text-xs text-slate-600">Unmonitored inflammation or infection develops silently over days.</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-rose-200 bg-white text-left space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 font-bold text-xs">
                  04
                </div>
                <h4 className="text-sm font-bold text-slate-900">Emergency Visit</h4>
                <p className="text-xs text-slate-600">Patient experiences acute distress and rushes to the emergency room.</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-rose-300 bg-rose-50 text-left space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-rose-200 border border-rose-300 flex items-center justify-center text-rose-800 font-bold text-xs">
                  05
                </div>
                <h4 className="text-sm font-bold text-rose-900">Avoidable Readmission</h4>
                <p className="text-xs text-rose-700">High cost for hospitals, physical emotional toll on patient.</p>
              </div>

            </div>
          </div>

          {/* Sahayak Proactive Loop */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h3 className="text-xs uppercase font-bold tracking-widest text-teal-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
              The Sahayak Continuous Loop
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="glass-panel p-5 rounded-2xl border border-teal-200 bg-white text-left space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs">
                  01
                </div>
                <h4 className="text-sm font-bold text-slate-900">Daily Check-in Logged</h4>
                <p className="text-xs text-slate-600">Via App, SMS, or automated voice call in seconds.</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-teal-200 bg-white text-left space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs">
                  02
                </div>
                <h4 className="text-sm font-bold text-slate-900">Twin Score Recalculated</h4>
                <p className="text-xs text-slate-600">Confidence score and Recovery Drift update instantly.</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-teal-200 bg-white text-left space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs">
                  03
                </div>
                <h4 className="text-sm font-bold text-slate-900">AI Flags Drift Early</h4>
                <p className="text-xs text-slate-600">Explainable alert generated for doctor before pain spikes.</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-teal-200 bg-white text-left space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs">
                  04
                </div>
                <h4 className="text-sm font-bold text-slate-900">Remote Micro-Adjustment</h4>
                <p className="text-xs text-slate-600">Doctor tweaks dosage or ASHA worker conducts home visit.</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-emerald-300 bg-emerald-50 text-left space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-200 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
                  05
                </div>
                <h4 className="text-sm font-bold text-emerald-900">Safe Full Recovery</h4>
                <p className="text-xs text-emerald-700">Complications prevented, continuous safety achieved.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
