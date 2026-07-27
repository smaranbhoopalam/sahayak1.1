import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity } from 'lucide-react';

export const BeatingHeartECG: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 relative">
      {/* Big Beating Heart Frame - Refined Healthcare Styling */}
      <div className="relative w-64 h-80 bg-white/85 backdrop-blur-xl rounded-3xl border border-sky-200/80 p-5 flex flex-col items-center justify-between shadow-xl shadow-sky-900/5 overflow-hidden">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between z-10">
          <span className="text-xs font-bold text-sky-700 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-brand-500" /> Cardiac Pulse Engine
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
            72 BPM ❤️
          </span>
        </div>

        {/* Big Beating Heart Visual */}
        <div className="relative my-auto flex items-center justify-center">
          {/* Shockwave Rings */}
          <motion.div
            className="absolute w-40 h-40 rounded-full border border-rose-400/40 bg-rose-400/10 pointer-events-none"
            animate={{
              scale: [0.8, 1.6, 2],
              opacity: [0.8, 0.3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          <motion.div
            className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-rose-500 via-rose-400 to-brand-500 text-white flex items-center justify-center shadow-xl shadow-rose-500/30 border-2 border-white"
            animate={{
              scale: [1, 1.25, 1, 1.18, 1],
              rotate: [0, -3, 3, -1, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart className="w-14 h-14 fill-white text-white drop-shadow-md" />
            <div className="absolute w-3 h-3 rounded-full bg-white/90 animate-ping" />
          </motion.div>
        </div>

        {/* Mini ECG Graph Path at Bottom of Card */}
        <div className="w-full h-8 relative flex items-center justify-center z-10">
          <svg viewBox="0 0 300 60" className="w-full h-full text-rose-500" fill="none">
            <motion.path
              d="M 0 30 L 70 30 L 80 15 L 90 45 L 100 30 L 130 30 L 140 5 L 150 55 L 160 20 L 170 40 L 180 30 L 220 30 L 230 20 L 240 30 L 300 30"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathLength: [0, 0.4, 0.4, 0],
                pathOffset: [0, 0.6, 1, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </svg>
        </div>
      </div>

      {/* Cheesy Medicine Tags & Emojis */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="p-3 rounded-2xl bg-white/90 border border-rose-200 text-xs font-semibold text-slate-800 shadow-md flex items-center gap-2.5 max-w-xs"
      >
        <span className="text-lg">💓</span>
        <div>
          <div className="text-rose-700 font-bold">Pulse Check: 100% Vibing!</div>
          <div className="text-[11px] text-slate-500">Heart Rate Optimum & Thriving</div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.04 }}
        className="p-3 rounded-2xl bg-white/90 border border-sky-200 text-xs font-semibold text-slate-800 shadow-md flex items-center gap-2.5 max-w-xs"
      >
        <span className="text-lg">🩹</span>
        <div>
          <div className="text-brand-700 font-bold">Band-Aid for Post-Op Blues</div>
          <div className="text-[11px] text-slate-500">Instant Healing & Positive Energy ⚡</div>
        </div>
      </motion.div>
    </div>
  );
};
