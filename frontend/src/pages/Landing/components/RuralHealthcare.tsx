import React, { useState } from 'react';
import { Phone, WifiOff } from 'lucide-react';

export const RuralHealthcare: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sms' | 'ivr'>('sms');

  return (
    <section id="rural-asha" className="py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <WifiOff className="w-3.5 h-3.5" />
            Universal Healthcare Inclusivity
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Healthcare without internet or smartphones.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Over 60% of rural patients don't own smartphones. Sahayak bridges this digital divide with automated SMS and IVR voice guidance that continuously updates the Digital Twin.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-3 text-left shadow-xs">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center">01</span>
            <h3 className="text-sm font-bold text-slate-900">No Internet</h3>
            <p className="text-xs text-slate-600">Patient lives in a remote village with basic feature phone.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-3 text-left shadow-xs">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center">02</span>
            <h3 className="text-sm font-bold text-slate-900">Automated SMS / IVR</h3>
            <p className="text-xs text-slate-600">System triggers daily SMS or automated voice call in regional language.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-3 text-left shadow-xs">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center">03</span>
            <h3 className="text-sm font-bold text-slate-900">Patient Keypad Reply</h3>
            <p className="text-xs text-slate-600">Patient presses '1' for meds taken, or replies via simple SMS text.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-3 text-left shadow-xs">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center">04</span>
            <h3 className="text-sm font-bold text-slate-900">Twin Auto-Updated</h3>
            <p className="text-xs text-slate-600">Natural language AI parses response and updates Twin RCS score.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-300 bg-emerald-50 space-y-3 text-left shadow-xs">
            <span className="w-7 h-7 rounded-lg bg-emerald-200 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center justify-center">05</span>
            <h3 className="text-sm font-bold text-emerald-900">Doctor Notified</h3>
            <p className="text-xs text-emerald-700 font-medium">City surgeon views real-time telemetry from remote patient.</p>
          </div>

        </div>

        <div className="mt-12 max-w-3xl mx-auto glass-panel p-8 rounded-3xl border border-slate-200 bg-white shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900 font-heading">Interactive Feature Phone Simulator</h3>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('sms')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${activeTab === 'sms' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                SMS Mode
              </button>
              <button 
                onClick={() => setActiveTab('ivr')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${activeTab === 'ivr' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                IVR Voice Call
              </button>
            </div>
          </div>

          {activeTab === 'sms' ? (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-left font-mono text-xs max-w-md mx-auto">
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 p-3.5 rounded-2xl border border-slate-200 shadow-2xs max-w-[85%] space-y-1">
                  <span className="text-[10px] text-emerald-700 block font-bold">SAHAYAK SYSTEM (SMS):</span>
                  "Namaste Ramesh ji. Have you taken your morning cardiac tablet today? Reply 1 for YES, 2 for NO."
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-emerald-600 text-white border border-emerald-700 p-3.5 rounded-2xl max-w-[85%] space-y-1 shadow-2xs">
                  <span className="text-[10px] text-emerald-100 block font-bold font-mono">PATIENT FEATURE PHONE:</span>
                  "1. Pain is 2 today."
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-white text-slate-800 p-3.5 rounded-2xl border border-slate-200 shadow-2xs max-w-[85%] space-y-1">
                  <span className="text-[10px] text-emerald-700 block font-bold">SAHAYAK SYSTEM:</span>
                  "Thank you! Your Living Digital Twin score updated to 94%. Dr. Amanda has been informed."
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-4 max-w-md mx-auto">
              <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping"></div>
                <span className="text-xs font-bold text-emerald-800">Automated IVR Call in Progress (+91 98765-XXXXX)</span>
              </div>

              <div className="space-y-2 text-xs text-slate-800 font-mono">
                <p><strong className="text-teal-700">IVR Voice (Hindi):</strong> "Press 1 if you have any wound redness. Press 2 if feeling normal."</p>
                <p><strong className="text-slate-500">Keypad Input:</strong> Patient pressed [2]</p>
                <p><strong className="text-teal-700">IVR Voice:</strong> "Recorded. Take 8 hours rest. Namaste."</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
