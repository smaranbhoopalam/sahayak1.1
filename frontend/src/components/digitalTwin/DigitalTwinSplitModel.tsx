import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Cpu, Heart, ArrowRight } from 'lucide-react';

export const DigitalTwinSplitModel: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl border border-sky-400/40 p-5 shadow-2xl shadow-sky-900/30 backdrop-blur-xl overflow-hidden font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Section: Real World vs Digital World Headers */}
      <div className="flex items-center justify-between pb-3 border-b border-sky-800/60 relative z-10">
        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
          <div className="p-1 rounded-full bg-sky-500/20 text-sky-400">
            <Globe className="w-3.5 h-3.5" />
          </div>
          <span>REAL WORLD</span>
        </div>

        {/* Division Axis Marker */}
        <div className="w-px h-6 bg-sky-400/60 relative">
          <div className="w-2 h-2 rounded-full bg-sky-400 -translate-x-[3.5px] -translate-y-1" />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
          <span>DIGITAL WORLD</span>
          <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400">
            <Cpu className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main Center Area: Split Body Anatomy Visual + Side Labels (Image 2 Reference) */}
      <div className="relative my-4 flex items-center justify-between gap-2 py-2">
        
        {/* Left Side Medical Labels (Real World) */}
        <div className="w-28 space-y-3.5 text-[10px] font-bold text-sky-200/90 text-right z-10">
          <div className="p-1.5 rounded-lg bg-sky-950/70 border border-sky-800/60 hover:border-sky-400 transition-colors">
            PHYSICAL ENVIRONMENT
          </div>
          <div className="p-1.5 rounded-lg bg-sky-950/70 border border-sky-800/60 hover:border-sky-400 transition-colors">
            VITAL MONITORING
          </div>
          <div className="p-1.5 rounded-lg bg-sky-950/70 border border-sky-800/60 hover:border-sky-400 transition-colors">
            LAB & DIAGNOSTICS
          </div>
          <div className="p-1.5 rounded-lg bg-sky-950/70 border border-sky-800/60 hover:border-sky-400 transition-colors">
            POST-OP PROCEDURES
          </div>
          <div className="p-1.5 rounded-lg bg-sky-950/70 border border-sky-800/60 hover:border-sky-400 transition-colors">
            PHYSICAL ACTIVITIES
          </div>
        </div>

        {/* Center Split Body Representation */}
        <div className="relative w-32 h-64 flex items-center justify-center">
          {/* Central Dividing Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-sky-400 via-indigo-400 to-sky-400 -translate-x-1/2 z-0 opacity-80" />

          {/* Left Half Body (Physical Muscle / Skeletal) */}
          <div className="w-1/2 h-full flex flex-col items-end pr-0.5 justify-center relative z-10">
            <div className="w-7 h-7 rounded-tl-full rounded-tr-xs bg-gradient-to-b from-sky-600 to-sky-800 border-l border-t border-sky-400/80 mb-1 flex items-center justify-center">
              <span className="text-[8px]">🧠</span>
            </div>
            <div className="w-10 h-24 rounded-tl-2xl rounded-bl-xs bg-gradient-to-br from-sky-700 via-blue-900 to-slate-900 border-l border-t border-sky-400/80 mb-1 relative flex items-center justify-center p-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400" />
              </motion.div>
            </div>
            <div className="w-10 h-24 rounded-bl-2xl bg-gradient-to-b from-blue-900 to-sky-950 border-l border-b border-sky-400/80 flex items-center justify-center">
              <span className="text-[9px]">🦵</span>
            </div>
          </div>

          {/* Right Half Body (Digital Mesh Wireframe) */}
          <div className="w-1/2 h-full flex flex-col items-start pl-0.5 justify-center relative z-10">
            <div className="w-7 h-7 rounded-tr-full rounded-tl-xs bg-indigo-950 border-r border-t border-indigo-400/80 mb-1 flex items-center justify-center bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:4px_4px]">
              <span className="text-[8px]">⚡</span>
            </div>
            <div className="w-10 h-24 rounded-tr-2xl rounded-br-xs bg-indigo-950 border-r border-t border-indigo-400/80 mb-1 relative flex items-center justify-center p-1 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:4px_4px]">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
            </div>
            <div className="w-10 h-24 rounded-br-2xl bg-indigo-950 border-r border-b border-indigo-400/80 flex items-center justify-center bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:4px_4px]">
              <span className="text-[9px]">📡</span>
            </div>
          </div>

          {/* Scanning Laser Beam Effect */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-400 shadow-lg shadow-sky-400/80 z-20"
            animate={{ top: ['5%', '90%', '5%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Right Side Medical Labels (Digital World) */}
        <div className="w-28 space-y-3.5 text-[10px] font-bold text-indigo-200/90 text-left z-10">
          <div className="p-1.5 rounded-lg bg-indigo-950/70 border border-indigo-800/60 hover:border-indigo-400 transition-colors">
            CLINICAL RECORDS
          </div>
          <div className="p-1.5 rounded-lg bg-indigo-950/70 border border-indigo-800/60 hover:border-indigo-400 transition-colors">
            IoMT SENSORS
          </div>
          <div className="p-1.5 rounded-lg bg-indigo-950/70 border border-indigo-800/60 hover:border-indigo-400 transition-colors">
            BIOMETRIC OMICS
          </div>
          <div className="p-1.5 rounded-lg bg-indigo-950/70 border border-indigo-800/60 hover:border-indigo-400 transition-colors">
            RECOVERY DRIFT AI
          </div>
          <div className="p-1.5 rounded-lg bg-indigo-950/70 border border-indigo-800/60 hover:border-indigo-400 transition-colors">
            ENVIRONMENTAL AI
          </div>
        </div>
      </div>

      {/* Bottom Data Pipeline Banner (Matching Image 2 Footer) */}
      <div className="pt-3 border-t border-sky-800/60 flex items-center justify-between text-[10px] font-extrabold text-sky-300 relative z-10">
        <span className="font-mono text-slate-400">DATA SYNC:</span>
        <div className="flex items-center gap-1.5 tracking-wider">
          <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">INTEGRATE</span>
          <ArrowRight className="w-3 h-3 text-sky-400" />
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">DERIVE</span>
          <ArrowRight className="w-3 h-3 text-indigo-400" />
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">ACTUATE</span>
        </div>
      </div>
    </div>
  );
};
