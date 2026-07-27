import React, { useState } from 'react';
import { Stethoscope, Activity } from 'lucide-react';

interface SyncStep {
  id: number;
  stage: string;
  actor: 'Patient' | 'Digital Twin' | 'AI Engine' | 'Doctor';
  action: string;
  detail: string;
}

const SYNC_FLOW: SyncStep[] = [
  {
    id: 1,
    stage: "01. Patient Log",
    actor: 'Patient',
    action: "Logs Night time Coughing & Swelling",
    detail: "Patient Rajesh logs: 'Persistent dry cough began at 2 AM with slight ankle tightness.'"
  },
  {
    id: 2,
    stage: "02. Twin Update",
    actor: 'Digital Twin',
    action: "Confidence Score drops from 90% to 74%",
    detail: "Living Digital Twin updates immediately. Recovery Drift Index drops -4.2%."
  },
  {
    id: 3,
    stage: "03. Clinical Notification",
    actor: 'Doctor',
    action: "Doctor Receives Priority Push Notification",
    detail: "Dr. Sharma's dashboard alerts: 'Drift Warning for Rajesh K. (#SH-4092) - Potential Fluid Retention.'"
  },
  {
    id: 4,
    stage: "04. Explainable AI",
    actor: 'AI Engine',
    action: "AI Generates Clinical Summary & Options",
    detail: "AI flags: 'Nighttime cough + ankle tightness post-cardiac surgery suggests mild fluid overload. Recommended: Adjust diuretic dosage.'"
  },
  {
    id: 5,
    stage: "05. Doctor Response",
    actor: 'Doctor',
    action: "Doctor Approves Prescription Micro-Adjustment",
    detail: "Dr. Sharma clicks 'Approve Dosage Tweak: Increase Lasix to 20mg for 3 days'. Patient notified instantly."
  }
];

export const DoctorSync: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="doctor-sync" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
            Real-Time Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Patient ↔ Doctor Synchronization
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Click through the 5-step collaborative loop to see how patient inputs seamlessly flow to the doctor's dashboard with AI explainability.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {SYNC_FLOW.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition duration-200 ${
                activeStep === idx 
                  ? 'bg-teal-50 border-teal-300 text-slate-900 shadow-md scale-[1.02]' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider block text-teal-700">{item.stage}</span>
              <span className="text-xs font-bold text-slate-900 block mt-1 line-clamp-1">{item.actor}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-teal-800 text-xs font-mono font-bold">
                {SYNC_FLOW[activeStep].stage}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200">
                Actor: {SYNC_FLOW[activeStep].actor}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              {SYNC_FLOW[activeStep].action}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200">
              {SYNC_FLOW[activeStep].detail}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button 
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => prev - 1)}
                className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 transition"
              >
                Previous Step
              </button>

              <button 
                disabled={activeStep === SYNC_FLOW.length - 1}
                onClick={() => setActiveStep(prev => prev + 1)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:from-teal-700 hover:to-emerald-700 transition shadow-sm"
              >
                Next Step
              </button>

              <span className="text-xs text-slate-500 font-medium">Step {activeStep + 1} of 5</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-slate-900">Live Sync Channel</span>
              </div>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Encrypted Real-time
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs">
                <span className="text-[10px] text-slate-500 block font-bold">PATIENT MOBILE APP:</span>
                "Log: Cough + swelling in ankles."
              </div>

              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 shadow-2xs">
                <span className="text-[10px] text-teal-700 block font-bold">AI EXPLANATION ENGINE:</span>
                "Flagged fluid drift. Confidence 74%. Doctor alert sent."
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 shadow-2xs">
                <span className="text-[10px] text-indigo-700 block font-bold">CLINICIAN DASHBOARD:</span>
                "Dr. Sharma approved dosage tweak. Remotely sent to patient phone."
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
