import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles } from 'lucide-react';

export const DigitalTwinHeroGuy: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 relative">
      {/* Outer Holographic Container */}
      <div className="relative w-64 h-80 bg-slate-900/80 rounded-3xl border border-brand-500/30 p-5 flex flex-col items-center justify-between shadow-2xl shadow-brand-500/10 backdrop-blur-xl overflow-hidden group">
        
        {/* Holographic Header */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-400">
            <Sparkles className="w-3.5 h-3.5 text-brand-300 animate-spin" />
            <span>Digital Twin Guy 🤖</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold">
            Live 99.9%
          </span>
        </div>

        {/* Laser Scanning Line Moving Up & Down */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent shadow-lg shadow-brand-400/80 z-20"
          animate={{ top: ['10%', '85%', '10%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Futuristic Anatomical Human Silhouette */}
        <div className="relative my-auto flex flex-col items-center justify-center scale-110">
          {/* Head */}
          <div className="w-10 h-10 rounded-full border-2 border-brand-400/80 bg-brand-500/20 mb-1 flex items-center justify-center relative shadow-inner">
            <div className="w-3 h-3 rounded-full bg-brand-400 animate-ping" />
            <span className="absolute -top-3 text-xs">🧠</span>
          </div>
          {/* Torso */}
          <div className="w-16 h-24 rounded-2xl border-2 border-brand-400/60 bg-brand-500/10 mb-1 relative flex flex-col items-center justify-center p-1">
            {/* Pulsing Heart Center */}
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-rose-400 drop-shadow-md"
            >
              ❤️
            </motion.div>
            <span className="text-[9px] font-bold text-slate-300 mt-1">Torso Core</span>
          </div>
          {/* Legs */}
          <div className="w-16 flex justify-between gap-1 h-20">
            <div className="w-7 bg-brand-500/20 rounded-b-xl border-x border-b border-brand-400/50 flex items-center justify-center">
              <span className="text-[9px]">🦵</span>
            </div>
            {/* Surgery Target Knee */}
            <div className="w-7 bg-rose-500/20 rounded-b-xl border-x border-b border-rose-400/60 relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Hologram Indicator */}
        <div className="w-full pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 z-10">
          <span className="flex items-center gap-1 font-semibold text-brand-300">
            <Activity className="w-3 h-3 text-brand-400" /> ROM: 92°
          </span>
          <span className="font-mono text-emerald-400">Zero Risk ⚡</span>
        </div>
      </div>

      {/* Cheesy Medicine Tags & Emojis */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="p-2.5 rounded-2xl bg-slate-900/90 border border-brand-500/40 text-xs font-semibold text-white shadow-xl flex items-center gap-2 max-w-xs"
      >
        <span className="text-base">🧬</span>
        <div>
          <div className="text-brand-300 font-bold">Digital Twin Guy Sync</div>
          <div className="text-[11px] text-slate-400">100% Bio-metric Compatibility!</div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="p-2.5 rounded-2xl bg-slate-900/90 border border-rose-500/40 text-xs font-semibold text-white shadow-xl flex items-center gap-2 max-w-xs"
      >
        <span className="text-base">💊</span>
        <div>
          <div className="text-rose-300 font-bold">Cheesy Rx Prescription</div>
          <div className="text-[11px] text-slate-400">1 Dose of Good Health Daily 🚀</div>
        </div>
      </motion.div>
    </div>
  );
};
