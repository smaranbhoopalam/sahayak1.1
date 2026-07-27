import React, { useState, useEffect } from 'react';
import { 
  Activity, Sparkles, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, 
  Pill, Thermometer, Moon, Sliders, RefreshCw
} from 'lucide-react';

interface AssessmentState {
  painScore: number;
  mobilityScore: number;
  temperature: number;
  swelling: number;
  medicationTaken: boolean;
  sleepHours: number;
  woundStatus: string;
}

export const LivingDigitalTwin: React.FC = () => {
  const [inputs, setInputs] = useState<AssessmentState>({
    painScore: 3,
    mobilityScore: 8,
    temperature: 98.6,
    swelling: 2,
    medicationTaken: true,
    sleepHours: 7.5,
    woundStatus: 'Normal'
  });

  const [rcs, setRcs] = useState<number>(92);
  const [drift, setDrift] = useState<number>(+4.5);
  const [barriers, setBarriers] = useState<string[]>([]);
  const [bodyStatusColor, setBodyStatusColor] = useState<string>('emerald');

  useEffect(() => {
    let score = 100.0;

    if (inputs.painScore > 1) score -= (inputs.painScore - 1) * 3.0;
    if (inputs.mobilityScore < 10) score -= (10 - inputs.mobilityScore) * 2.0;
    if (!inputs.medicationTaken) score -= 18.0;
    if (inputs.temperature > 100.4) score -= 20.0;
    else if (inputs.temperature > 99.5) score -= 8.0;
    if (inputs.sleepHours < 4) score -= 15.0;
    else if (inputs.sleepHours < 6) score -= 7.5;
    if (inputs.swelling > 5) score -= (inputs.swelling - 5) * 3.5;

    const finalRcs = Math.max(0, Math.min(100, Math.round(score * 10) / 10));
    setRcs(finalRcs);

    const calculatedDrift = Math.round((finalRcs - 85.0) * 10) / 10;
    setDrift(calculatedDrift);

    const currentBarriers: string[] = [];
    if (inputs.painScore >= 7) currentBarriers.push("High Pain Level");
    if (inputs.temperature >= 100.4) currentBarriers.push("Fever Detected");
    if (!inputs.medicationTaken) currentBarriers.push("Missed Prescribed Medication");
    if (inputs.swelling >= 7) currentBarriers.push("Severe Tissue Swelling");
    if (inputs.sleepHours < 5) currentBarriers.push("Inadequate Rest");
    setBarriers(currentBarriers);

    if (finalRcs >= 80) setBodyStatusColor('emerald');
    else if (finalRcs >= 55) setBodyStatusColor('amber');
    else setBodyStatusColor('rose');

  }, [inputs]);

  return (
    <section id="digital-twin" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Flagship Innovation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            The Living Digital Twin
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            It is NOT a feature. It is the patient's continuous recovery identity. Move the sliders below to experience how the Twin reacts in real time.
          </p>
        </div>

        {/* Digital Twin Interactive Sandbox */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white space-y-6 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-600" />
                Live Patient Controls
              </h3>
              <button 
                onClick={() => setInputs({
                  painScore: 2, mobilityScore: 9, temperature: 98.6, swelling: 2, medicationTaken: true, sleepHours: 8, woundStatus: 'Normal'
                })}
                className="text-xs text-slate-500 hover:text-teal-700 font-medium flex items-center gap-1 transition"
              >
                <RefreshCw className="w-3 h-3" /> Reset Normal
              </button>
            </div>

            <div className="space-y-5 text-left">
              
              {/* Pain Level Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Pain Level (1 - 10)</span>
                  <span className={`font-mono font-bold transition-colors duration-200 ${inputs.painScore > 6 ? 'text-rose-600' : 'text-teal-700'}`}>
                    {Math.round(inputs.painScore * 10) / 10} / 10
                  </span>
                </div>
                <input 
                  type="range" min="1" max="10" step="0.1"
                  value={inputs.painScore}
                  onChange={(e) => setInputs({...inputs, painScore: parseFloat(e.target.value)})}
                  style={{ '--range-pct': `${((inputs.painScore - 1) / 9) * 100}%` } as React.CSSProperties}
                  className="w-full rounded-lg cursor-pointer"
                />
              </div>

              {/* Mobility Score Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Mobility Score (1 - 10)</span>
                  <span className="text-teal-700 font-mono font-bold">{Math.round(inputs.mobilityScore * 10) / 10} / 10</span>
                </div>
                <input 
                  type="range" min="1" max="10" step="0.1"
                  value={inputs.mobilityScore}
                  onChange={(e) => setInputs({...inputs, mobilityScore: parseFloat(e.target.value)})}
                  style={{ '--range-pct': `${((inputs.mobilityScore - 1) / 9) * 100}%` } as React.CSSProperties}
                  className="w-full rounded-lg cursor-pointer"
                />
              </div>

              {/* Swelling Severity Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Swelling Index (1 - 10)</span>
                  <span className="text-teal-700 font-mono font-bold">{Math.round(inputs.swelling * 10) / 10} / 10</span>
                </div>
                <input 
                  type="range" min="1" max="10" step="0.1"
                  value={inputs.swelling}
                  onChange={(e) => setInputs({...inputs, swelling: parseFloat(e.target.value)})}
                  style={{ '--range-pct': `${((inputs.swelling - 1) / 9) * 100}%` } as React.CSSProperties}
                  className="w-full rounded-lg cursor-pointer"
                />
              </div>

              {/* Temperature & Sleep Hours Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-amber-600" /> Temp (°F)
                  </label>
                  <input 
                    type="number" step="0.2"
                    value={inputs.temperature}
                    onChange={(e) => setInputs({...inputs, temperature: parseFloat(e.target.value) || 98.6})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-indigo-600" /> Sleep (hrs)
                  </label>
                  <input 
                    type="number" step="0.5"
                    value={inputs.sleepHours}
                    onChange={(e) => setInputs({...inputs, sleepHours: parseFloat(e.target.value) || 8})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Medication Adherence Checkbox */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Pill className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-800">Prescription Taken Today?</span>
                </div>
                <input 
                  type="checkbox"
                  checked={inputs.medicationTaken}
                  onChange={(e) => setInputs({...inputs, medicationTaken: e.target.checked})}
                  className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                />
              </div>

              {/* Preset Scenario Buttons */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-2">Preset Clinical States:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setInputs({ painScore: 2, mobilityScore: 9, temperature: 98.6, swelling: 2, medicationTaken: true, sleepHours: 8, woundStatus: 'Normal' })}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl py-2 text-xs font-bold transition"
                  >
                    Optimal Healing
                  </button>
                  <button 
                    onClick={() => setInputs({ painScore: 9, mobilityScore: 2, temperature: 102.1, swelling: 8, medicationTaken: true, sleepHours: 3.5, woundStatus: 'Infected' })}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl py-2 text-xs font-bold transition"
                  >
                    Fever Spike Alert
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Digital Twin Visualization & Real-time Score Display */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white space-y-6 shadow-md">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* RCS Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Recovery Confidence Score</span>
                  <Activity className="w-4 h-4 text-teal-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-extrabold font-mono ${
                    bodyStatusColor === 'emerald' ? 'text-emerald-600' :
                    bodyStatusColor === 'amber' ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {rcs}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ 100</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      bodyStatusColor === 'emerald' ? 'bg-emerald-500' :
                      bodyStatusColor === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${rcs}%` }}
                  ></div>
                </div>
              </div>

              {/* Drift Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Recovery Drift Index</span>
                  {drift >= 0 ? <TrendingUp className="w-4 h-4 text-emerald-600" /> : <TrendingDown className="w-4 h-4 text-rose-600" />}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-extrabold font-mono ${drift >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {drift >= 0 ? `+${drift}` : drift}%
                  </span>
                  <span className="text-xs text-slate-500">vs target protocol</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {drift >= 0 ? 'Exceeding target milestone curve' : 'Trajectory lagging baseline plan'}
                </p>
              </div>

            </div>

            {/* Central SVG Twin Figure */}
            <div className="relative bg-slate-50/70 p-6 pt-10 rounded-2xl border border-slate-200 flex flex-col items-center justify-center min-h-[320px]">
              
              {/* Status Glow Halo */}
              <div className={`absolute w-48 h-48 rounded-full blur-3xl opacity-20 ${
                bodyStatusColor === 'emerald' ? 'bg-emerald-400' :
                bodyStatusColor === 'amber' ? 'bg-amber-400' : 'bg-rose-400'
              }`}></div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 w-full justify-around">
                
                {/* 3D Anatomical Body Model Image */}
                <div className="relative w-40 h-72 flex items-center justify-center select-none">
                  <img
                    src="/src/assets/digital_twin_hologram.png"
                    alt="Digital Twin"
                    className={`w-full h-full object-contain filter transition-all duration-500 ${
                      bodyStatusColor === 'emerald' ? 'hue-rotate-0 saturate-100 brightness-100' :
                      bodyStatusColor === 'amber' ? 'hue-rotate-[45deg] saturate-120' : 'hue-rotate-[120deg] saturate-150 brightness-95'
                    }`}
                  />
                  {inputs.painScore > 4 && (
                    <div 
                      className="absolute top-[45%] left-1/2 w-12 h-12 bg-rose-500/25 border border-rose-500 rounded-full animate-ping pointer-events-none"
                      style={{ transform: `translate(-50%, -50%) scale(${inputs.painScore / 5})` }}
                    />
                  )}
                  {inputs.swelling > 4 && (
                    <div 
                      className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500/30 border border-amber-500 rounded-full animate-pulse pointer-events-none"
                    />
                  )}

                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xs border border-teal-200 px-2.5 py-0.5 rounded-full text-[10px] text-teal-800 font-mono font-bold shadow-2xs whitespace-nowrap z-20">
                    Living Identity
                  </div>
                </div>

                {/* Detected Barriers & System Diagnosis text */}
                <div className="text-left space-y-4 max-w-xs">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Detected Barriers</h4>
                    {barriers.length > 0 ? (
                      <div className="space-y-1.5">
                        {barriers.map((b, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1.5 rounded-lg font-semibold">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1.5 rounded-lg font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>No risk barriers detected</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1 shadow-2xs">
                    <span className="font-bold text-slate-900 block">Doctor Telemetry Sync</span>
                    <p className="text-[11px]">Updates reflected automatically on the linked clinical dashboard in <strong>&lt; 500ms</strong>.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
