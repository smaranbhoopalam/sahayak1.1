import React from 'react';
import { EyeOff, AlertTriangle, HeartPulse, Check, X } from 'lucide-react';

export const Problem: React.FC = () => {
  return (
    <section id="problem" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            The Core Healthcare Void
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Healthcare shouldn't end at hospital discharge.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A patient's true recovery journey begins the moment they step outside the hospital. Yet today, healthcare systems completely lose visibility during the most vulnerable 30-day window.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Traditional Broken Care (Left) */}
          <div className="glass-panel p-8 rounded-3xl border border-rose-200 bg-rose-50/40 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-100 border border-rose-200 text-rose-600">
                <EyeOff className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Traditional Post-Discharge</h3>
                <p className="text-xs text-rose-700 font-semibold">Reactive, Episodic & Disconnected</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Once discharged, patients rely on static paper printouts. When subtle complications start, no one notices until severe emergency symptoms force readmission.
            </p>

            <ul className="space-y-3.5 pt-2">
              {[
                "Doctors lose complete visibility until scheduled 1-month follow-up visits.",
                "Patients forget dosage timing or stop medications due to unmonitored side effects.",
                "Complications (infections, fever, fluid retention) are discovered too late.",
                "Rural patients struggle to travel long distances for simple check-in queries.",
                "Family members have zero insight into true daily recovery trajectory."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                  <div className="p-1 rounded bg-rose-100 text-rose-600 shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sahayak Living Digital Twin Care (Right) */}
          <div className="glass-panel p-8 rounded-3xl border border-teal-200 bg-teal-50/40 space-y-6 glow-teal shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-teal-100 border border-teal-200 text-teal-700">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Sahayak Connected Twin</h3>
                <p className="text-xs text-teal-700 font-semibold">Continuous, Intelligent & Proactive</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              The Living Digital Twin evolves every single day based on patient check-ins, remote vitals, and smart AI score calculations. Doctors see changes in real time.
            </p>

            <ul className="space-y-3.5 pt-2">
              {[
                "Real-time patient-doctor sync keeps clinical teams connected 24/7.",
                "Automated Recovery Confidence & Drift tracking flags complications early.",
                "Inclusive SMS & IVR support allows rural patients without internet to stay tracked.",
                "Community ASHA workers automatically dispatched for missed check-ins or high risk.",
                "Explainable AI offers early guidance before symptoms turn into emergencies."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-slate-800">
                  <div className="p-1 rounded bg-teal-100 text-teal-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
