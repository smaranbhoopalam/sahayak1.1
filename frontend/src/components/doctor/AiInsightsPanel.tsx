import React from 'react';
import { Sparkles, ArrowRight, BrainCircuit, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AiInsight {
  id: string;
  patientId: string;
  patientName: string;
  type: 'warning' | 'alert' | 'recommendation' | 'positive';
  title: string;
  description: string;
  actionText: string;
  actionPath: string;
  confidence: number;
}

const mockInsights: AiInsight[] = [
  {
    id: 'INS-01',
    patientId: 'PAT-102',
    patientName: 'Priya Patel',
    type: 'alert',
    title: 'Patient recovering slower than expected',
    description: 'Drift index shifted to 3.4. Passive knee flexor angle is 18° behind predicted baseline.',
    actionText: 'Review Knee ROM Chart',
    actionPath: '/doctor/patient/PAT-102',
    confidence: 96,
  },
  {
    id: 'INS-02',
    patientId: 'PAT-109',
    patientName: 'Karan Mehta',
    type: 'warning',
    title: 'Possible flexor mobility issue detected',
    description: 'Computer vision motion sensor detected gait asymmetry during morning exercise log.',
    actionText: 'Inspect Motion Capture',
    actionPath: '/doctor/patient/PAT-109',
    confidence: 91,
  },
  {
    id: 'INS-03',
    patientId: 'PAT-105',
    patientName: 'Vikram Singh',
    type: 'recommendation',
    title: 'Recommend follow-up consultation',
    description: 'Elevated post-CABG heart rate variability. Recommend tele-consultation before Day 21.',
    actionText: 'Schedule Teleconsult',
    actionPath: '/doctor/appointments',
    confidence: 89,
  },
  {
    id: 'INS-04',
    patientId: 'PAT-101',
    patientName: 'Rahul Sharma',
    type: 'positive',
    title: 'Optimal rehabilitation velocity confirmed',
    description: 'Quadriceps activation score +4.2% higher than predicted model. Patient ready for Stage 3.',
    actionText: 'View Digital Twin',
    actionPath: '/doctor/patient/PAT-101',
    confidence: 98,
  },
];

export const AiInsightsPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white shadow-md shadow-brand-500/20">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              Sahayak AI Clinical Insights
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200">
                Live AI Model Sync
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Automated pattern detection from patient sensor data & daily questionnaires
            </p>
          </div>
        </div>
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {mockInsights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
              insight.type === 'alert'
                ? 'bg-rose-50/40 border-rose-200/80 hover:border-rose-300'
                : insight.type === 'warning'
                ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300'
                : insight.type === 'positive'
                ? 'bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-300'
                : 'bg-indigo-50/40 border-indigo-200/80 hover:border-indigo-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-black text-slate-900 flex items-center gap-1.5">
                  {insight.type === 'alert' && <AlertCircle className="w-3.5 h-3.5 text-rose-600" />}
                  {insight.type === 'warning' && <Activity className="w-3.5 h-3.5 text-amber-600" />}
                  {insight.type === 'positive' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {insight.type === 'recommendation' && <Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
                  {insight.patientName}
                </span>

                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-600">
                  {insight.confidence}% AI Confidence
                </span>
              </div>

              <h4 className="text-xs font-black text-slate-900 mb-1 leading-snug">
                {insight.title}
              </h4>
              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed mb-3">
                {insight.description}
              </p>
            </div>

            <button
              onClick={() => navigate(insight.actionPath)}
              className="inline-flex items-center gap-1 text-xs font-black text-brand-600 hover:text-brand-700 hover:underline pt-2 border-t border-slate-200/60"
            >
              <span>{insight.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
