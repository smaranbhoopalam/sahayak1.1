import React, { useState } from 'react';
import { 
  Stethoscope, CheckCircle2, TrendingUp, Sparkles, Pill, Zap, ShieldCheck
} from 'lucide-react';
import { IridescenceBackground } from './IridescenceBackground';

export const Hero: React.FC = () => {
  const [heroDay, setHeroDay] = useState<number>(7);
  const [heroRcs, setHeroRcs] = useState<number>(88);
  const [heroDrift, setHeroDrift] = useState<number>(+3.2);
  const [activeRegion, setActiveRegion] = useState<string>('Abdominal Suture');

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-50 flex items-center justify-center min-h-screen">
      
      {/* Centered Rounded Card Container (React Bits Demo Layout) */}
      <div className="relative w-[90%] max-w-[1600px] min-h-[780px] rounded-[32px] overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-200/60 bg-white flex flex-col justify-center py-12 px-6 sm:px-10 lg:px-16">
        
        {/* Iridescence WebGL Background (Clipped strictly inside this card) */}
        <div className="absolute inset-0 z-0">
          <IridescenceBackground
            speed={1.8}
            amplitude={0.13}
            blur={6}
            borderRadius={32}
            mouseReact={true}
          />
        </div>

        {/* Hero Content Layer */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Storytelling */}
            <div className="lg:col-span-6 space-y-7 text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-teal-200 text-teal-800 text-xs font-semibold backdrop-blur-md shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Redefining Post-Discharge Healthcare</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping"></span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.1]">
                  Discharge is not the end of care. <br />
                  <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                    It's where recovery begins.
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                  When a patient leaves the hospital doors, traditional healthcare loses sight. 
                  <strong className="text-slate-900 font-medium"> Sahayak bridges the dark gap </strong> 
                  by building a Living Digital Twin—an evolving biological portrait that keeps doctors remotely connected and predicts complications before emergencies happen.
                </p>
              </div>

              {/* Feature Stat Cards */}
              <div className="grid grid-cols-3 gap-3 max-w-lg">
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] text-slate-500 font-medium">Flagship Tech</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Living Digital Twin</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] text-slate-500 font-medium">Monitoring</p>
                  <p className="text-xs sm:text-sm font-bold text-teal-700 mt-0.5">Continuous 24/7</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] text-slate-500 font-medium">Reach</p>
                  <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">Urban & Rural</p>
                </div>
              </div>

              {/* Key Clinical Guarantees Card */}
              <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2.5 max-w-lg">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                  <div className="p-1 rounded-md bg-teal-50 text-teal-600 border border-teal-100 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Automated telemetry monitoring & predictive drift alerts</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                  <div className="p-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Zero app install required — SMS, IVR & WhatsApp fallback</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                  <div className="p-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <span>HIPAA & clinical privacy compliant hospital EHR integration</span>
                </div>
              </div>

              {/* Trust Footer */}
              <div className="flex items-center gap-6 pt-2 border-t border-slate-200/80">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center text-[10px] text-teal-800 font-bold">DR</div>
                    <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-[10px] text-emerald-800 font-bold">AS</div>
                    <div className="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-300 flex items-center justify-center text-[10px] text-indigo-800 font-bold">AI</div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Trusted by clinical remote teams</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Interactive Digital Twin */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/20 via-emerald-400/20 to-indigo-400/20 rounded-3xl blur-xl opacity-80"></div>
                
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-200/90 shadow-xl shadow-slate-200/60">
                  
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-teal-300 flex items-center justify-center font-bold text-teal-700 text-sm">
                          PT
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          Rajesh K. <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-semibold">ID: #SH-4092</span>
                        </h3>
                        <p className="text-xs text-slate-500">Post Cardiac Bypass • Day {heroDay} Recovery</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full">
                      <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-[11px] font-semibold text-indigo-800">Dr. Sharma Linked</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-slate-50/90 p-5 rounded-2xl border border-slate-200/80">
                    
                    {/* Digital Twin 3D Image Model */}
                    <div className="sm:col-span-5 flex flex-col items-center justify-center relative py-2 select-none">
                      <div className="relative w-36 h-56 flex items-center justify-center">
                        <img 
                          src="/src/assets/digital_twin_hologram.png" 
                          alt="Digital Twin" 
                          className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(20,184,166,0.15)]"
                        />
                        <div className={`absolute left-1/2 -translate-x-1/2 w-10 h-10 border rounded-full animate-ping pointer-events-none ${
                          activeRegion === 'Mild Inflammation' ? 'top-[45%] bg-rose-500/20 border-rose-500' : 'top-[35%] bg-teal-500/15 border-teal-500'
                        }`} />

                        <div className="absolute top-12 -right-4 bg-white border border-teal-200 px-2 py-1 rounded-lg text-[10px] text-teal-800 font-bold shadow-md animate-bounce">
                          Heart Rate: 72 bpm
                        </div>
                        <div className="absolute bottom-16 -left-4 bg-white border border-emerald-200 px-2 py-1 rounded-lg text-[10px] text-emerald-800 font-bold shadow-md">
                          {activeRegion} Healing
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-7 space-y-4 text-left">
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600 font-semibold">Recovery Confidence Score</span>
                          <span className="text-teal-700 font-bold font-mono">{heroRcs}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500 rounded-full" 
                            style={{ width: `${heroRcs}%` }}
                          ></div>
                        </div>
                        <p className="text-[10px] text-slate-500">Continuous AI assessment based on daily logs</p>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-600 font-semibold block">Recovery Drift Index</span>
                          <span className="text-[10px] text-slate-500">Variance from target trajectory</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs font-mono">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                          <span>+{heroDrift}%</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] text-slate-500 font-medium block">Simulate Recovery Day:</span>
                        <div className="grid grid-cols-3 gap-1.5">
                          <button 
                            onClick={() => { setHeroDay(2); setHeroRcs(68); setHeroDrift(-4.5); setActiveRegion('Mild Inflammation'); }}
                            className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${heroDay === 2 ? 'bg-teal-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                          >
                            Day 2 (Initial)
                          </button>
                          <button 
                            onClick={() => { setHeroDay(7); setHeroRcs(88); setHeroDrift(+3.2); setActiveRegion('Abdominal Suture'); }}
                            className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${heroDay === 7 ? 'bg-teal-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                          >
                            Day 7 (Stable)
                          </button>
                          <button 
                            onClick={() => { setHeroDay(21); setHeroRcs(96); setHeroDrift(+7.8); setActiveRegion('Optimal Recovery'); }}
                            className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${heroDay === 21 ? 'bg-teal-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                          >
                            Day 21 (Thriving)
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1 text-left">
                    <div className="flex items-center gap-2.5 text-xs bg-slate-50/90 p-3 rounded-xl border border-slate-200">
                      <Pill className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 block">Medication Adherence</span>
                        <span className="text-slate-800 font-bold text-xs">100% (Morning Dose Logged)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs bg-slate-50/90 p-3 rounded-xl border border-slate-200">
                      <Zap className="w-4 h-4 text-teal-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 block">Doctor Sync Status</span>
                        <span className="text-teal-700 font-bold text-xs">Real-time Encrypted</span>
                      </div>
                    </div>
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
