import React from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export const RecoveryOverviewCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart 1: Recovery Trend (Weekly Trajectory) */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Recovery Velocity vs Predicted Baseline</h4>
              <p className="text-[11px] text-slate-500 font-semibold">Cohort average progression across 30 post-op days</p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            +3.4% Above Baseline
          </span>
        </div>

        {/* Dummy Visual Chart graphic */}
        <div className="h-44 w-full relative flex items-end justify-between pt-6 px-2">
          {/* Baseline curve line SVG overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 160" preserveAspectRatio="none">
            <path
              d="M 10 140 Q 100 110, 200 65 T 390 20"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <path
              d="M 10 145 Q 100 95, 200 45 T 390 12"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
            />
          </svg>

          {/* Bar Columns */}
          {[
            { label: 'Wk 1', actual: 45, predicted: 40 },
            { label: 'Wk 2', actual: 68, predicted: 60 },
            { label: 'Wk 3', actual: 82, predicted: 75 },
            { label: 'Wk 4', actual: 91, predicted: 86 },
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 z-10">
              <div className="flex items-end gap-1.5 h-32">
                <div
                  style={{ height: `${bar.predicted}%` }}
                  className="w-5 bg-slate-200 rounded-t-md opacity-70"
                  title={`Predicted: ${bar.predicted}%`}
                />
                <div
                  style={{ height: `${bar.actual}%` }}
                  className="w-5 bg-gradient-to-t from-brand-600 to-emerald-400 rounded-t-md shadow-xs"
                  title={`Actual Cohort: ${bar.actual}%`}
                />
              </div>
              <span className="text-[10px] font-extrabold text-slate-500">{bar.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-brand-500" /> Actual Cohort Avg
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-300" /> AI Predicted Model
          </div>
        </div>
      </div>

      {/* Chart 2: Risk & Confidence Distribution */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Cohort Risk Distribution</h4>
              <p className="text-[11px] text-slate-500 font-semibold">128 Total Active Patients</p>
            </div>
          </div>

          <div className="py-4 space-y-3">
            {[
              { label: 'Low Risk (Normal)', count: 104, pct: 81, color: 'bg-emerald-500' },
              { label: 'Medium Risk (Monitor)', count: 15, pct: 12, color: 'bg-amber-500' },
              { label: 'High Risk (Intervene)', count: 6, pct: 5, color: 'bg-rose-500' },
              { label: 'Critical Risk (Urgent)', count: 3, pct: 2, color: 'bg-rose-700' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{item.label}</span>
                  <span className="font-black">{item.count} ({item.pct}%)</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Overall AI Confidence Index</span>
          <span className="text-xl font-black text-brand-600">86.4% Optimal</span>
        </div>
      </div>
    </div>
  );
};
