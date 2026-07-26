import React, { useState } from 'react';
import { Users, CheckCircle2, AlertCircle, Send, RotateCcw } from 'lucide-react';

export const AshaWorkerNetwork: React.FC = () => {
  const [taskState, setTaskState] = useState<'idle' | 'detected' | 'dispatched' | 'resolved'>('idle');

  return (
    <section id="asha-network" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            Last-Mile Community Healthcare
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            The ASHA Worker Emergency Network
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            When high-risk patients go silent or miss daily check-ins, Sahayak automatically creates community tasks and dispatches nearby ASHA workers for doorstep wellness checks.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          
          <div className={`glass-panel p-4 rounded-2xl border text-left space-y-2 transition ${taskState !== 'idle' ? 'border-rose-300 bg-rose-50' : 'border-slate-200 bg-white'}`}>
            <span className="text-[10px] uppercase font-bold text-rose-700">Step 01</span>
            <h3 className="text-xs font-bold text-slate-900">Patient Inactive</h3>
            <p className="text-[11px] text-slate-600">No log for 36 hours post-discharge.</p>
          </div>

          <div className={`glass-panel p-4 rounded-2xl border text-left space-y-2 transition ${taskState === 'detected' || taskState === 'dispatched' || taskState === 'resolved' ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}`}>
            <span className="text-[10px] uppercase font-bold text-amber-700">Step 02</span>
            <h3 className="text-xs font-bold text-slate-900">AI Notices Risk</h3>
            <p className="text-[11px] text-slate-600">Confidence score drops due to telemetry silence.</p>
          </div>

          <div className={`glass-panel p-4 rounded-2xl border text-left space-y-2 transition ${taskState === 'dispatched' || taskState === 'resolved' ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 bg-white'}`}>
            <span className="text-[10px] uppercase font-bold text-indigo-700">Step 03</span>
            <h3 className="text-xs font-bold text-slate-900">Nearby ASHA Identified</h3>
            <p className="text-[11px] text-slate-600">Geofence matches ASHA worker Jyoti (1.2 km away).</p>
          </div>

          <div className={`glass-panel p-4 rounded-2xl border text-left space-y-2 transition ${taskState === 'dispatched' || taskState === 'resolved' ? 'border-teal-300 bg-teal-50' : 'border-slate-200 bg-white'}`}>
            <span className="text-[10px] uppercase font-bold text-teal-700">Step 04</span>
            <h3 className="text-xs font-bold text-slate-900">Home Visit Assigned</h3>
            <p className="text-[11px] text-slate-600">Task pushed to ASHA mobile app with case summary.</p>
          </div>

          <div className={`glass-panel p-4 rounded-2xl border text-left space-y-2 transition ${taskState === 'resolved' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
            <span className="text-[10px] uppercase font-bold text-emerald-700">Step 05</span>
            <h3 className="text-xs font-bold text-slate-900">Doorstep Check</h3>
            <p className="text-[11px] text-slate-600">ASHA checks vitals & reminds medication.</p>
          </div>

          <div className={`glass-panel p-4 rounded-2xl border text-left space-y-2 transition ${taskState === 'resolved' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
            <span className="text-[10px] uppercase font-bold text-emerald-700">Step 06</span>
            <h3 className="text-xs font-bold text-slate-900">Twin Restored</h3>
            <p className="text-[11px] text-slate-600">Digital Twin telemetry synced back to doctor.</p>
          </div>

        </div>

        <div className="mt-12 glass-panel p-8 rounded-3xl border border-slate-200 bg-white shadow-md space-y-6 text-left max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">ASHA Community Dispatch Simulator</h3>
              <p className="text-xs text-slate-500 font-medium">Trigger silent patient emergency dispatch in real-time</p>
            </div>
            
            <button
              onClick={() => {
                if (taskState === 'idle') setTaskState('detected');
                else if (taskState === 'detected') setTaskState('dispatched');
                else if (taskState === 'dispatched') setTaskState('resolved');
                else setTaskState('idle');
              }}
              className={`px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
                taskState === 'idle' 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white border-rose-400/30 shadow-rose-500/25 hover:shadow-rose-500/40' 
                  : taskState === 'detected'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-amber-400/30 shadow-amber-500/25 hover:shadow-amber-500/40'
                  : taskState === 'dispatched'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white border-teal-400/30 shadow-teal-500/25 hover:shadow-teal-500/40'
                  : 'bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-zinc-900 text-white border-slate-600/30 shadow-slate-500/20 hover:shadow-slate-500/30'
              }`}
            >
              {taskState === 'idle' && (
                <>
                  <AlertCircle className="w-4 h-4 animate-pulse" />
                  <span>Simulate Inactive Patient Alert</span>
                </>
              )}
              {taskState === 'detected' && (
                <>
                  <Send className="w-4 h-4" />
                  <span>Dispatch Nearby ASHA Worker</span>
                </>
              )}
              {taskState === 'dispatched' && (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Home Visit Complete</span>
                </>
              )}
              {taskState === 'resolved' && (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Simulator</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500">TASK #ASHA-9021 • VILLAGE RECOVERY NETWORK</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                taskState === 'idle' ? 'bg-slate-200 text-slate-700' :
                taskState === 'detected' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                taskState === 'dispatched' ? 'bg-teal-100 text-teal-900 border border-teal-300' :
                'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}>
                {taskState === 'idle' && 'STATUS: MONITORED'}
                {taskState === 'detected' && 'STATUS: RISK DETECTED'}
                {taskState === 'dispatched' && 'STATUS: ASHA DISPATCHED'}
                {taskState === 'resolved' && 'STATUS: HOME VISIT COMPLETE & TWIN UPDATED'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-500 block">Patient Name</span>
                <span className="text-slate-900 font-bold">Amit Kumar (Gram Rampur)</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-500 block">Assigned ASHA Worker</span>
                <span className="text-teal-700 font-bold">Jyoti Devi (ASHA #44)</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-500 block">Proximity</span>
                <span className="text-emerald-700 font-bold font-mono">1.2 km away</span>
              </div>
            </div>

            {taskState === 'resolved' && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ASHA Jyoti logged doorstep visit. Medicines refilled and twin score restored to 88%.</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
