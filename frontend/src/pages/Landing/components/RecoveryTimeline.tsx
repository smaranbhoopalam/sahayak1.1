import React, { useState } from 'react';
import { Clock, Stethoscope } from 'lucide-react';

interface TimelineStep {
  day: number;
  title: string;
  phase: string;
  pain: number;
  mobility: number;
  confidence: number;
  drift: number;
  medsTaken: boolean;
  notes: string;
  doctorIntervention?: string;
  status: 'critical' | 'caution' | 'recovering' | 'thriving';
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    day: 1,
    title: "Hospital Discharge & Baseline Twin Setup",
    phase: "Acute Post-Op",
    pain: 7,
    mobility: 3,
    confidence: 65,
    drift: 0.0,
    medsTaken: true,
    notes: "Patient discharged with surgical drain. Initial baseline Digital Twin created.",
    status: 'caution'
  },
  {
    day: 4,
    title: "Mild Inflammation & Missed Midday Pill",
    phase: "Early Home Recovery",
    pain: 6,
    mobility: 4,
    confidence: 58,
    drift: -6.2,
    medsTaken: false,
    notes: "Patient missed medication due to nausea. Recovery Drift turns negative.",
    status: 'critical'
  },
  {
    day: 8,
    title: "Sahayak AI Alert & Remote Doctor Micro-Adjustment",
    phase: "Clinical Intervention",
    pain: 4,
    mobility: 6,
    confidence: 82,
    drift: +2.1,
    medsTaken: true,
    notes: "AI flagged drift. Dr. Sharma prescribed anti-emetic & adjusted pain meds remotely.",
    doctorIntervention: "Adjusted dosage to twice daily with food",
    status: 'recovering'
  },
  {
    day: 15,
    title: "Steadily Improving Mobility & Suture Healing",
    phase: "Active Healing",
    pain: 2,
    mobility: 8,
    confidence: 91,
    drift: +5.4,
    medsTaken: true,
    notes: "Walking 2,000 steps daily. Patient logs low pain score.",
    status: 'recovering'
  },
  {
    day: 30,
    title: "Full Milestone Recovery Achieved",
    phase: "Complete Milestone",
    pain: 1,
    mobility: 10,
    confidence: 98,
    drift: +8.5,
    medsTaken: true,
    notes: "Twin indicates 98% Recovery Confidence. Patient returns to full regular daily activities.",
    status: 'thriving'
  }
];

export const RecoveryTimeline: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2);
  const currentStep = TIMELINE_STEPS[activeStepIndex];

  return (
    <section id="timeline" className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            Interactive Scrubbing Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            The Living Recovery Timeline
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Recovery evolves day by day. Drag or click through the timeline scrub to see how Sahayak catches early drift and guides patients back to safety.
          </p>
        </div>

        <div className="mt-16 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
          
          <div className="flex justify-between text-xs text-slate-500 font-semibold px-2">
            <span>Discharge (Day 1)</span>
            <span className="text-teal-700 font-bold">Drag Scrubber to Explore</span>
            <span>Full Recovery (Day 30)</span>
          </div>

          <div className="relative">
            <input 
              type="range" 
              min="0" 
              max={TIMELINE_STEPS.length - 1}
              step="0.01"
              value={activeStepIndex}
              onChange={(e) => setActiveStepIndex(Math.round(parseFloat(e.target.value)))}
              style={{ '--range-pct': `${(activeStepIndex / (TIMELINE_STEPS.length - 1)) * 100}%` } as React.CSSProperties}
              className="w-full rounded-lg cursor-pointer"
            />

            <div className="hidden sm:flex justify-between items-center mt-3 px-1">
              {TIMELINE_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex flex-col items-center gap-1 transition ${
                    activeStepIndex === idx ? 'text-teal-800 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border font-bold ${
                    activeStepIndex === idx ? 'bg-teal-600 text-white border-teal-600 shadow-xs' : 'bg-slate-100 border-slate-300'
                  }`}>
                    {step.day}
                  </span>
                  <span className="text-[11px]">Day {step.day}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-md">
          
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-mono font-bold text-xs">
                DAY {currentStep.day}
              </span>
              <span className="text-xs text-slate-500 font-semibold">Phase: {currentStep.phase}</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 font-heading">{currentStep.title}</h3>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              "{currentStep.notes}"
            </p>

            {currentStep.doctorIntervention && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900">
                <Stethoscope className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 block">Doctor Intervention</span>
                  <p className="text-xs text-indigo-900 mt-0.5 font-medium">{currentStep.doctorIntervention}</p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Digital Twin Telemetry Snapshot</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium block">Confidence Score</span>
                <span className="text-2xl font-extrabold text-teal-700 font-mono">{currentStep.confidence}%</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium block">Recovery Drift</span>
                <span className={`text-2xl font-extrabold font-mono ${currentStep.drift >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {currentStep.drift >= 0 ? `+${currentStep.drift}` : currentStep.drift}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-1">
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium">Pain Level</span>
                <span className="text-slate-900 font-mono font-bold">{currentStep.pain}/10</span>
              </div>

              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium">Mobility</span>
                <span className="text-slate-900 font-mono font-bold">{currentStep.mobility}/10</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
