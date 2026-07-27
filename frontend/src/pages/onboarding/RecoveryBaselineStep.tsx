import React from 'react';

interface RecoveryBaselineStepProps {
  data: {
    painLevel: number;
    mobility: string;
    sleepQuality: string;
    appetite: string;
  };
  onChange: (updated: Partial<RecoveryBaselineStepProps['data']>) => void;
}

const MOBILITY_OPTIONS = [
  { id: 'independent', label: 'Walk Independently', desc: 'No assistance needed', icon: '🏃‍♂️' },
  { id: 'aids', label: 'Needs Walking Aids', desc: 'Using cane, walker, or support', icon: '🦯' },
  { id: 'assistance', label: 'Requires Assistance', desc: 'Need help from family/nurse', icon: '🤝' },
  { id: 'bed', label: 'Bed/Wheelchair Bound', desc: 'Highly restricted movement', icon: '🛏️' },
];

const SLEEP_OPTIONS = [
  { id: 'good', label: 'Restful Sleep', icon: '🔋' },
  { id: 'fair', label: 'Interrupted', icon: '🔌' },
  { id: 'poor', label: 'Insomnia / Poor', icon: '🪫' },
];

const APPETITE_OPTIONS = [
  { id: 'normal', label: 'Normal / Good', icon: '🍎' },
  { id: 'reduced', label: 'Reduced', icon: '🥣' },
  { id: 'poor', label: 'No Appetite', icon: '🚫' },
];

export const RecoveryBaselineStep: React.FC<RecoveryBaselineStepProps> = ({ data, onChange }) => {
  
  const getPainDetails = (level: number) => {
    if (level <= 2) return { text: 'Mild / Manageable Pain', color: 'text-emerald-600' };
    if (level <= 5) return { text: 'Moderate Pain', color: 'text-amber-600' };
    if (level <= 8) return { text: 'Severe Pain', color: 'text-orange-600' };
    return { text: 'Very Severe Pain', color: 'text-rose-600' };
  };

  const painDetails = getPainDetails(data.painLevel);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-400 text-left font-sans">
      
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">Your Current Baseline</h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          This establishes your Day 0 baseline state, allowing the system to monitor improvements.
        </p>
      </div>

      {/* Pain Level */}
      <div className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-800">
            1. Current Pain Level
          </label>
          <span className={`text-sm font-bold font-mono px-2.5 py-0.5 rounded bg-slate-100 ${painDetails.color}`}>
            {data.painLevel} / 10
          </span>
        </div>
        <p className={`text-xs font-bold ${painDetails.color}`}>
          {painDetails.text}
        </p>
        
        <input
          type="range"
          min="0"
          max="10"
          value={data.painLevel}
          onChange={(e) => onChange({ painLevel: parseInt(e.target.value) })}
          style={{ '--range-pct': `${(data.painLevel / 10) * 100}%` } as React.CSSProperties}
          className="w-full"
        />

        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
          <span>0 (No Pain)</span>
          <span>5 (Moderate)</span>
          <span>10 (Unbearable)</span>
        </div>
      </div>

      {/* Mobility */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          2. Current Mobility Level
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOBILITY_OPTIONS.map((opt) => {
            const isSelected = data.mobility === opt.label;
            return (
              <button
                key={opt.id}
                onClick={() => onChange({ mobility: opt.label })}
                type="button"
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${
                  isSelected 
                    ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-305 shadow-xs'
                }`}
              >
                <span className="text-2xl mt-0.5 select-none">{opt.icon}</span>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">{opt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sleep & Appetite split */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Sleep Quality */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">
            3. Sleep Quality Last Night
          </label>
          <div className="flex flex-col gap-2">
            {SLEEP_OPTIONS.map((opt) => {
              const isSelected = data.sleepQuality === opt.label;
              return (
                <button
                  key={opt.id}
                  onClick={() => onChange({ sleepQuality: opt.label })}
                  type="button"
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition cursor-pointer ${
                    isSelected 
                      ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' 
                      : 'bg-white border-slate-205 text-slate-700 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <span className="text-lg select-none">{opt.icon}</span>
                  <span className="text-xs font-bold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Appetite */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">
            4. Food & Appetite Status
          </label>
          <div className="flex flex-col gap-2">
            {APPETITE_OPTIONS.map((opt) => {
              const isSelected = data.appetite === opt.label;
              return (
                <button
                  key={opt.id}
                  onClick={() => onChange({ appetite: opt.label })}
                  type="button"
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition cursor-pointer ${
                    isSelected 
                      ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' 
                      : 'bg-white border-slate-205 text-slate-700 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <span className="text-lg select-none">{opt.icon}</span>
                  <span className="text-xs font-bold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
