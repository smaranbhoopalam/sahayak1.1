import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Activity, ShieldCheck, AlertTriangle, 
  ArrowLeft, Sparkles, MessageSquare, Shield,
  Cpu, TrendingUp, Info, HelpCircle, Calendar, RefreshCw
} from 'lucide-react';

interface RecoveryTwinHomeProps {
  onBackToOnboarding: () => void;
  onboardingData?: {
    procedure: string;
    dischargeDate: string;
    bodyArea: string;
    conditions: string[];
    allergies: string[];
    medications: string[];
    painLevel: number;
    mobility: string;
    sleepQuality: string;
    appetite: string;
    goals: string[];
    customGoals: string[];
  };
}

export const RecoveryTwinHome: React.FC<RecoveryTwinHomeProps> = ({ 
  onBackToOnboarding, 
  onboardingData = {
    procedure: 'Cardiac Bypass Surgery',
    dischargeDate: new Date().toISOString().split('T')[0],
    bodyArea: 'Chest / Heart Area',
    conditions: ['Hypertension'],
    allergies: ['Penicillin'],
    medications: ['Aspirin 75mg', 'Metoprolol 25mg'],
    painLevel: 3,
    mobility: 'Walk Independently',
    sleepQuality: 'Restful Sleep',
    appetite: 'Normal / Good',
    goals: ['Reduce daily pain levels', 'Walk independently without aids'],
    customGoals: ['Walk 200m without feeling short of breath']
  }
}) => {
  const [driftSimulated, setDriftSimulated] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const confidenceScore = driftSimulated ? 76 : 92;
  const healthStatus = driftSimulated ? 'Telemetry Shift Alert' : 'Optimal Recovery Trajectory';
  const statusColorClass = driftSimulated ? 'text-rose-800 bg-rose-50 border-rose-200' : 'text-emerald-800 bg-emerald-50 border-emerald-200';

  // Dynamic values depending on drift simulation
  const biometrics = {
    pain: driftSimulated ? '7 / 10' : `${onboardingData.painLevel} / 10`,
    painStatus: driftSimulated ? 'Elevated' : 'Expected',
    painColor: driftSimulated ? 'text-rose-600 bg-rose-50' : 'text-teal-600 bg-teal-50',
    heartRate: driftSimulated ? '92 bpm' : '72 bpm',
    hrStatus: driftSimulated ? 'Mild Tachycardia' : 'Optimal',
    hrColor: driftSimulated ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50',
    mobility: driftSimulated ? '65%' : '82%',
    mobilityStatus: driftSimulated ? 'Limb Guarding' : 'Normal Progress',
    mobilityColor: driftSimulated ? 'text-orange-600 bg-orange-50' : 'text-teal-600 bg-teal-50',
    inflammation: driftSimulated ? 'Moderate' : 'Low / Normal',
    inflammationColor: driftSimulated ? 'text-orange-600 bg-orange-50' : 'text-emerald-600 bg-emerald-50',
    sleep: '7.8 hrs',
    hydration: 'Optimal',
    trend: driftSimulated ? 'Unstable / Guarded' : 'Consistently Improving',
    trendColor: driftSimulated ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'
  };

  // Defining anatomical SVG zones with hover metadata
  const bodyRegions = [
    { 
      id: 'head', 
      name: 'Cranial Zone (Head)', 
      type: 'circle',
      cx: 50, 
      cy: 22, 
      r: 11,
      status: 'Healthy',
      color: 'stroke-emerald-400 fill-emerald-500/10 hover:fill-emerald-500/20'
    },
    { 
      id: 'neck', 
      name: 'Cervical Zone (Neck)', 
      type: 'rect',
      x: 47, 
      y: 33, 
      width: 6, 
      height: 7,
      status: 'Healthy',
      color: 'stroke-emerald-400 fill-emerald-500/10 hover:fill-emerald-500/20'
    },
    { 
      id: 'chest', 
      name: 'Thoracic Zone (Chest & Heart)', 
      type: 'path',
      path: 'M 35,40 L 65,40 L 63,68 L 37,68 Z',
      status: onboardingData.bodyArea.includes('Chest') || onboardingData.bodyArea.includes('Heart')
        ? (driftSimulated ? 'Requires Monitoring' : 'Recovering') 
        : 'Healthy',
      color: onboardingData.bodyArea.includes('Chest') || onboardingData.bodyArea.includes('Heart')
        ? (driftSimulated 
            ? 'stroke-rose-500 fill-rose-500/20 hover:fill-rose-500/30' 
            : 'stroke-amber-400 fill-amber-500/15 hover:fill-amber-500/25') 
        : 'stroke-emerald-400 fill-emerald-500/10 hover:fill-emerald-500/20'
    },
    { 
      id: 'abdomen', 
      name: 'Abdominal Zone (Internal Organs)', 
      type: 'path',
      path: 'M 37,68 L 63,68 L 60,105 L 40,105 Z',
      status: onboardingData.bodyArea.includes('Abdomen')
        ? (driftSimulated ? 'Requires Monitoring' : 'Recovering')
        : 'Healthy',
      color: onboardingData.bodyArea.includes('Abdomen')
        ? (driftSimulated 
            ? 'stroke-rose-500 fill-rose-500/20 hover:fill-rose-500/30' 
            : 'stroke-amber-400 fill-amber-500/15 hover:fill-amber-500/25')
        : 'stroke-emerald-400 fill-emerald-500/10 hover:fill-emerald-500/20'
    },
    { 
      id: 'pelvis', 
      name: 'Pelvic & Hip Zone', 
      type: 'path',
      path: 'M 40,105 L 60,105 L 58,122 L 42,122 Z',
      status: 'Healthy',
      color: 'stroke-emerald-400 fill-emerald-500/10 hover:fill-emerald-500/20'
    },
    { 
      id: 'left_arm', 
      name: 'Upper Extremity (Left Arm)', 
      type: 'path',
      path: 'M 34,42 L 18,92',
      status: 'Healthy',
      color: 'stroke-emerald-400 fill-emerald-500/10 hover:fill-emerald-500/20'
    },
    { 
      id: 'right_arm', 
      name: 'Upper Extremity (Right Arm)', 
      type: 'path',
      path: 'M 66,42 L 82,92',
      status: 'Healthy',
      color: 'stroke-emerald-400 fill-emerald-500/10 hover:fill-emerald-500/20'
    },
    { 
      id: 'left_leg', 
      name: 'Lower Extremity (Left Leg & Knee)', 
      type: 'path',
      path: 'M 43,122 L 40,188',
      status: onboardingData.bodyArea.includes('Legs')
        ? (driftSimulated ? 'Requires Monitoring' : 'Recovering')
        : 'Healthy',
      color: onboardingData.bodyArea.includes('Legs')
        ? (driftSimulated 
            ? 'stroke-rose-500 fill-rose-500/20 hover:fill-rose-500/30' 
            : 'stroke-amber-400 fill-amber-500/15 hover:fill-amber-500/25')
        : 'stroke-emerald-400 fill-emerald-500/10 hover:fill-emerald-500/20'
    },
    { 
      id: 'right_leg', 
      name: 'Lower Extremity (Right Leg & Knee)', 
      type: 'path',
      path: 'M 57,122 L 60,188',
      status: onboardingData.bodyArea.includes('Legs')
        ? (driftSimulated ? 'Requires Monitoring' : 'Recovering')
        : 'Healthy',
      color: onboardingData.bodyArea.includes('Legs')
        ? (driftSimulated 
            ? 'stroke-rose-500 fill-rose-500/20 hover:fill-rose-500/30' 
            : 'stroke-amber-400 fill-amber-500/15 hover:fill-amber-500/25')
        : 'stroke-emerald-400 fill-emerald-500/10 hover:fill-emerald-500/20'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      
      {/* Header bar */}
      <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToOnboarding}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition cursor-pointer"
              title="Return to Onboarding"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900">Living Digital Twin Model</h1>
                <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                  AI MODEL VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold">{onboardingData.procedure} Onboarding Calibration</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDriftSimulated(!driftSimulated)}
              className={`text-xs font-bold px-4 py-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                driftSimulated 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-600 shadow-sm' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {driftSimulated ? 'Reset Twin Calibration' : 'Simulate Clinical Drift'}
            </button>
          </div>
        </div>
      </header>

      {/* Main dashboard content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top grid section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Digital Twin & Floating Indicators (~41.6% width) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 relative overflow-hidden min-h-[580px]">
            <div className="absolute top-5 left-5 text-xs text-slate-400 font-bold flex items-center gap-1.5 uppercase tracking-wider select-none">
              <Cpu className="w-4 h-4 text-teal-600" />
              <span>Generative Twin Model</span>
            </div>

            {/* Interactive Anatomical SVG Model & Heatmap */}
            <div className="relative w-64 h-[400px] flex items-center justify-center mt-12 z-10">
              <svg viewBox="0 0 100 200" className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
                {bodyRegions.map((region) => {
                  const isHovered = hoveredRegion === region.id;
                  const isTarget = onboardingData.bodyArea.toLowerCase().includes(region.id.split('_')[0]);

                  if (region.type === 'circle') {
                    return (
                      <circle
                        key={region.id}
                        cx={region.cx}
                        cy={region.cy}
                        r={region.r}
                        strokeWidth={isHovered ? 2.5 : 1.5}
                        className={`transition-all duration-300 cursor-pointer ${region.color} ${isHovered ? 'scale-105 transform origin-center' : ''}`}
                        onMouseEnter={() => setHoveredRegion(region.id)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      />
                    );
                  } else if (region.type === 'rect') {
                    return (
                      <rect
                        key={region.id}
                        x={region.x}
                        y={region.y}
                        width={region.width}
                        height={region.height}
                        strokeWidth={isHovered ? 2.5 : 1.5}
                        className={`transition-all duration-300 cursor-pointer ${region.color}`}
                        onMouseEnter={() => setHoveredRegion(region.id)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      />
                    );
                  } else {
                    return (
                      <path
                        key={region.id}
                        d={region.path}
                        strokeWidth={isHovered ? 2.5 : 2}
                        strokeLinecap="round"
                        className={`transition-all duration-300 cursor-pointer ${region.color}`}
                        onMouseEnter={() => setHoveredRegion(region.id)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      />
                    );
                  }
                })}
              </svg>

              {/* FLOATING health indicators around the Digital Twin */}
              
              {/* Left Floating Cards */}
              <div className="absolute top-4 -left-12 flex flex-col gap-1 border border-slate-200 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl shadow-xs text-left w-28">
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Pain Score</span>
                <span className={`text-xs font-black ${biometrics.painColor} px-1.5 py-0.5 rounded-md inline-block w-fit`}>
                  {biometrics.pain}
                </span>
                <span className="text-[8px] text-slate-500 font-semibold">{biometrics.painStatus}</span>
              </div>

              <div className="absolute top-24 -left-14 flex flex-col gap-1 border border-slate-200 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl shadow-xs text-left w-28">
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Heart Rate</span>
                <span className={`text-xs font-black ${biometrics.hrColor} px-1.5 py-0.5 rounded-md inline-block w-fit`}>
                  {biometrics.heartRate}
                </span>
                <span className="text-[8px] text-slate-500 font-semibold">{biometrics.hrStatus}</span>
              </div>

              <div className="absolute bottom-24 -left-12 flex flex-col gap-1 border border-slate-200 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl shadow-xs text-left w-28">
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Mobility</span>
                <span className="text-xs font-black text-slate-800">{biometrics.mobility}</span>
                <span className="text-[8px] text-slate-500 font-semibold">{biometrics.mobilityStatus}</span>
              </div>

              {/* Right Floating Cards */}
              <div className="absolute top-4 -right-12 flex flex-col gap-1 border border-slate-200 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl shadow-xs text-left w-28">
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Inflammation</span>
                <span className={`text-xs font-black ${biometrics.inflammationColor} px-1.5 py-0.5 rounded-md inline-block w-fit`}>
                  {biometrics.inflammation}
                </span>
              </div>

              <div className="absolute top-24 -right-14 flex flex-col gap-1 border border-slate-200 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl shadow-xs text-left w-28">
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Sleep quality</span>
                <span className="text-xs font-black text-slate-800">{biometrics.sleep}</span>
                <span className="text-[8px] text-slate-500 font-semibold">{onboardingData.sleepQuality}</span>
              </div>

              <div className="absolute bottom-24 -right-12 flex flex-col gap-1 border border-slate-200 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl shadow-xs text-left w-28">
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Hydration</span>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md inline-block w-fit">
                  {biometrics.hydration}
                </span>
              </div>
            </div>

            {/* Interactive Tooltip Overlay */}
            <div className="h-12 w-full flex items-center justify-center mt-6">
              <AnimatePresence mode="wait">
                {hoveredRegion ? (
                  <motion.div
                    key={hoveredRegion}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-md"
                  >
                    <Info className="w-3.5 h-3.5 text-teal-400" />
                    <span>{bodyRegions.find(r => r.id === hoveredRegion)?.name}:</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                      bodyRegions.find(r => r.id === hoveredRegion)?.status === 'Healthy' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : bodyRegions.find(r => r.id === hoveredRegion)?.status === 'Recovering'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {bodyRegions.find(r => r.id === hoveredRegion)?.status}
                    </span>
                  </motion.div>
                ) : (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-slate-400 font-semibold"
                  >
                    Hover over body zones to view local biometric calibration status
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Calibration Footer */}
            <div className="w-full mt-6 space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Live Health Synchronization</span>
                <span className="text-teal-700 font-bold">100% Calibrated</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full w-full" />
              </div>
            </div>
          </div>

          {/* Right Column: AI Recovery Intelligence (~58.3% width) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top row: confidence rings and notifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Recovery Confidence */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Recovery Confidence</span>
                  <span className={`text-3xl font-black block my-1 ${driftSimulated ? 'text-rose-600' : 'text-teal-700'}`}>
                    {confidenceScore}%
                  </span>
                  <p className="text-[10px] text-slate-500 font-semibold leading-normal">
                    Trajectory meets target clinical guidelines
                  </p>
                </div>
                <div className="w-18 h-18 relative shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="36" cy="36" r="30" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                    <circle 
                      cx="36" 
                      cy="36" 
                      r="30" 
                      stroke={driftSimulated ? "#e11d48" : "#0d9488"} 
                      strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray={2 * Math.PI * 30}
                      strokeDashoffset={2 * Math.PI * 30 * (1 - confidenceScore / 100)}
                      className="transition-all duration-700"
                    />
                  </svg>
                </div>
              </div>

              {/* Clinician Connection */}
              <div className={`border rounded-3xl p-6 flex items-start gap-4 transition-all duration-300 shadow-sm bg-white border-slate-200`}>
                <div className={`p-3 rounded-xl shrink-0 shadow-2xs border ${
                  driftSimulated ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                }`}>
                  {driftSimulated ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Clinician connection</span>
                  <span className={`text-sm font-bold block my-0.5 ${driftSimulated ? 'text-rose-700' : 'text-emerald-700'}`}>
                    {healthStatus}
                  </span>
                  <p className="text-[10px] text-slate-600 leading-normal font-medium">
                    {driftSimulated 
                      ? 'Elevated baseline metrics detected. Alert pushed to Dr. Sharma.' 
                      : 'Real-time telemedicine bridge secure. No anomalies flagged.'}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Recovery Intelligence Panel */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-teal-700 uppercase tracking-wider">
                  <Cpu className="w-4.5 h-4.5" />
                  <span>AI Recovery Intelligence</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <span>Risk: <strong className={driftSimulated ? 'text-rose-600' : 'text-emerald-600'}>{driftSimulated ? 'Moderate' : 'Low'}</strong></span>
                  <span>Confidence: <strong>94%</strong></span>
                </div>
              </div>

              {/* Recovery Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recovery Summary</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {driftSimulated ? (
                    <>
                      ⚠️ <strong className="text-slate-900">Telemetry Shift Detected:</strong> Your logged pain levels rose to 7/10, and mobility markers indicate increased limb guard. This correlates with the discharge date of {onboardingData.dischargeDate}. We recommend restricting independent walking to short 5-minute indoor rounds. Dr. Sharma has been alerted with this telemetry summary.
                    </>
                  ) : (
                    <>
                      Based on your onboarding inputs, your Digital Twin predicts a normal post-operative recovery trajectory following your <strong className="text-teal-700">{onboardingData.procedure}</strong>. Your current mobility levels and reported pain index match healthy discharge criteria. No significant clinical drift has been detected.
                    </>
                  )}
                </p>
              </div>

              {/* Key Parameters Row */}
              <div className="grid grid-cols-3 gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Recovery Stage</span>
                  <span className="text-xs font-black text-slate-800">Early Recovery</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Days post-op</span>
                  <span className="text-xs font-black text-slate-800">Day 4</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Trajectory</span>
                  <span className={`text-xs font-black ${driftSimulated ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {driftSimulated ? 'Anomalous' : 'Expected'}
                  </span>
                </div>
              </div>

              {/* Key Findings */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Key Twin Findings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Pain within expected parameters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Stable baseline mobility logs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>No clinical anomalies flagged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Low complication score ({driftSimulated ? '18%' : '4%'})</span>
                  </div>
                </div>
              </div>

              {/* Recovery Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recovery Timeline Milestones</h4>
                <div className="relative border-l border-slate-200 pl-4 space-y-4 text-left">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-teal-600 ring-4 ring-white" />
                    <span className="text-xs font-black text-teal-800">Week 1–2: Inflammatory Management</span>
                    <p className="text-[10px] text-slate-500 font-medium">Focus on pain reduction, baseline rest, and light flexion.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                    <span className="text-xs font-bold text-slate-700">Week 3–6: Passive Range of Motion</span>
                    <p className="text-[10px] text-slate-500 font-medium">Increase mobility levels and begin guided physiotherapy tasks.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                    <span className="text-xs font-bold text-slate-700">Week 6–12: Strength Rebuilding</span>
                    <p className="text-[10px] text-slate-500 font-medium">Incorporate weighted resistance and joint load tolerance workouts.</p>
                  </div>
                </div>
              </div>

              {/* Why the AI Concluded This (Explainable AI) */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-teal-600" />
                  Why the AI concluded this
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                  This model evaluates <strong>{onboardingData.procedure}</strong> post-op protocols alongside your parameters: pain level <strong>{onboardingData.painLevel}/10</strong>, mobility status <strong>"{onboardingData.mobility}"</strong>, target goals <strong>"{onboardingData.goals[0]}"</strong>, and symptoms. Drift telemetry is checked hourly against clinical database baselines.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Section: Recovery Analytics & Wearable Telemetry */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
              <Activity className="w-4.5 h-4.5 text-teal-600" />
              <span>Recovery Analytics & Telemetry Sync</span>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Sensor Updates: Just Now</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ECG/Wearable Sensor Card */}
            <div className="border border-slate-150 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800">Smart Band ECG Sync</span>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold">CONNECTED</span>
              </div>
              <div className="h-16 flex items-end justify-between gap-1 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                {/* SVG Heart Rate wave graphic */}
                <svg viewBox="0 0 100 30" className="w-full h-full text-rose-500 fill-none" stroke="currentColor" strokeWidth="2">
                  <path d="M0,15 L20,15 L25,5 L30,25 L35,15 L50,15 L55,0 L60,30 L65,15 L80,15 L85,12 L90,18 L100,15" />
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">Real-time pulse rate matches telemetry parameters</p>
            </div>

            {/* Heart Rate / wearable data */}
            <div className="border border-slate-150 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-black text-slate-800 block">Active Metrics Summary</span>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">SpO₂</span>
                  <span className="text-slate-800 font-black">98% (Optimal)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">Activity Levels</span>
                  <span className="text-slate-800 font-black">{driftSimulated ? '1,240 steps (Target 3k)' : '2,850 steps'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">Daily Pain Trend</span>
                  <span className="text-slate-800 font-black">{driftSimulated ? 'Rising (7/10)' : 'Steady (3/10)'}</span>
                </div>
              </div>
            </div>

            {/* AI Calibration Details */}
            <div className="border border-slate-150 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-black text-slate-800 block">Clinical Verification</span>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">Sync Gateway</span>
                  <span className="text-slate-800 font-black">Asha Sync Node</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">Encrypted Telemetry</span>
                  <span className="text-slate-800 font-black">AES-256 Verified</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">Model Version</span>
                  <span className="text-slate-800 font-black">Sahayak v2.1-Twin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};
