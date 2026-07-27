import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Activity, ShieldCheck, Heart, RefreshCw, Layers } from 'lucide-react';

interface DigitalTwinPreviewProps {
  patientName?: string;
  condition?: string;
  compact?: boolean;
}

export const DigitalTwinPreview: React.FC<DigitalTwinPreviewProps> = ({
  patientName = 'Rahul Sharma',
  condition = 'Post-ACL Reconstruction',
  compact = false,
}) => {
  const [selectedOrgan, setSelectedOrgan] = useState<'knee' | 'quad' | 'vitals'>('knee');

  return (
    <Card
      bordered
      className="bg-slate-900 text-white shadow-xl relative overflow-hidden border-slate-800"
    >
      {/* Subtle digital background grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* Card Header */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Sahayak Digital Twin™</h3>
            <p className="text-[11px] text-slate-400">{patientName} • {condition}</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Live Model Sync
        </span>
      </div>

      {/* Main Body Representation */}
      <div className="relative z-10 py-6 flex flex-col md:flex-row items-center justify-around gap-6">
        {/* Anatomical Holographic Model Visual */}
        <div className="relative w-44 h-56 bg-slate-950/80 rounded-2xl border border-brand-500/30 flex items-center justify-center p-4 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Stylized Human Silhouette */}
          <div className="relative w-full h-full flex flex-col items-center justify-center opacity-85">
            {/* Head */}
            <div className="w-8 h-8 rounded-full border-2 border-brand-400/60 bg-brand-500/10 mb-1 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
            </div>
            {/* Torso */}
            <div className="w-14 h-20 rounded-xl border-2 border-brand-400/40 bg-brand-500/5 mb-1 relative flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-400 opacity-60" />
            </div>
            {/* Legs */}
            <div className="w-14 flex justify-between gap-1 h-20">
              <div className="w-6 bg-brand-500/10 rounded-b-md border-x border-b border-brand-400/30" />
              {/* Target Surgery Knee Marker */}
              <div className="w-6 bg-brand-500/20 rounded-b-md border-x border-b border-brand-400/60 relative">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-400/40 border border-amber-400 animate-pulse flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 left-2 text-[9px] font-mono text-brand-300/80">
            LOC: L-KNEE
          </div>
        </div>

        {/* Dynamic Organ Metric Selectors */}
        <div className="flex-1 w-full space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedOrgan('knee')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedOrgan === 'knee'
                  ? 'bg-brand-500/20 border-brand-400 text-white'
                  : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-brand-300">Joint Flexibility</div>
              <div className="text-sm font-bold text-white mt-0.5">85° Range</div>
            </button>
            <button
              onClick={() => setSelectedOrgan('quad')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedOrgan === 'quad'
                  ? 'bg-brand-500/20 border-brand-400 text-white'
                  : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-brand-300">Swelling Index</div>
              <div className="text-sm font-bold text-white mt-0.5">Mild (Level 2)</div>
            </button>
            <button
              onClick={() => setSelectedOrgan('vitals')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedOrgan === 'vitals'
                  ? 'bg-brand-500/20 border-brand-400 text-white'
                  : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-brand-300">Tissue Temp</div>
              <div className="text-sm font-bold text-white mt-0.5">36.8 °C</div>
            </button>
          </div>

          {/* Details Box */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
              <span className="flex items-center gap-1.5 text-brand-400">
                <ShieldCheck className="w-4 h-4" /> Twin Analysis Recommendation
              </span>
              <span className="text-[10px] text-emerald-400">Normal Progression</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {selectedOrgan === 'knee' && 'Knee flexion has improved by 15° over 4 days. Continue targeted straight leg raises.'}
              {selectedOrgan === 'quad' && 'Localized knee swelling is down 30% post cold compression therapy.'}
              {selectedOrgan === 'vitals' && 'Skin temperature at incision site is optimal with zero signs of acute inflammation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer controls */}
      {!compact && (
        <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-[11px]">
            <RefreshCw className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: '6s' }} />
            Simulating 7-day post-op outcome trajectory
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-brand-300 border-brand-500/40 hover:bg-brand-500/10 py-1 px-3"
            icon={<Layers className="w-3.5 h-3.5" />}
          >
            Expand 3D Model
          </Button>
        </div>
      )}
    </Card>
  );
};
