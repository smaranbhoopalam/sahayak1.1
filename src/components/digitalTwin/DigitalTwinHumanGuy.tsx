import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Cpu, Heart, ArrowRight } from 'lucide-react';

export const DigitalTwinHumanGuy: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm bg-slate-900/90 backdrop-blur-xl text-white rounded-3xl border border-sky-400/50 p-5 shadow-2xl shadow-sky-900/20 overflow-hidden font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Section */}
      <div className="flex items-center justify-between pb-3 border-b border-sky-800/80 relative z-10">
        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
          <div className="p-1 rounded-full bg-sky-500/20 text-sky-400">
            <Globe className="w-3.5 h-3.5" />
          </div>
          <span>REAL WORLD</span>
        </div>

        <div className="w-px h-6 bg-sky-400/80 relative">
          <div className="w-2 h-2 rounded-full bg-sky-400 -translate-x-[3.5px] -translate-y-1" />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
          <span>DIGITAL WORLD</span>
          <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400">
            <Cpu className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main Center Section: Split Human Body Model & Labels */}
      <div className="relative my-3 flex items-center justify-between gap-1 py-1">
        
        {/* Left Side Labels */}
        <div className="w-28 space-y-3 text-[10px] font-bold text-sky-200/90 text-right z-10">
          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-sky-800/70 hover:border-sky-400 transition-colors shadow-xs">
            PHYSICAL ENVIRONMENT
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-sky-800/70 hover:border-sky-400 transition-colors shadow-xs">
            VITAL MONITORING
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-sky-800/70 hover:border-sky-400 transition-colors shadow-xs">
            LAB & DIAGNOSTICS
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-sky-800/70 hover:border-sky-400 transition-colors shadow-xs">
            POST-OP PROCEDURES
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-sky-800/70 hover:border-sky-400 transition-colors shadow-xs">
            PHYSICAL ACTIVITIES
          </div>
        </div>

        {/* Detailed Human Silhouette SVG Visual */}
        <div className="relative w-36 h-72 flex items-center justify-center">
          
          {/* Laser Scanning Line */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-400 shadow-lg shadow-sky-400/90 z-30"
            animate={{ top: ['5%', '92%', '5%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Central Division Axis */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-sky-400 via-indigo-400 to-sky-400 -translate-x-1/2 z-20" />

          {/* SVG Human Figure Representation */}
          <svg viewBox="0 0 200 400" className="w-full h-full relative z-10" fill="none">
            {/* LEFT HALF (Physical Anatomy Body) */}
            <g id="physical-body">
              {/* Head Left */}
              <path d="M 100 20 C 80 20, 75 40, 75 55 C 75 70, 85 80, 100 82 Z" fill="#0284c7" fillOpacity="0.7" stroke="#38bdf8" strokeWidth="2" />
              {/* Neck & Shoulder Left */}
              <path d="M 100 82 L 75 90 L 50 110 L 40 160 L 55 160 L 65 125 L 80 110 L 100 110 Z" fill="#0369a1" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Chest & Ribcage Left */}
              <path d="M 100 110 L 75 115 L 68 170 L 78 200 L 100 210 Z" fill="#0c4a6e" fillOpacity="0.9" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Arm Left */}
              <path d="M 40 160 L 30 220 L 42 220 L 52 170 Z" fill="#0284c7" fillOpacity="0.7" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Pelvis & Leg Left */}
              <path d="M 100 210 L 72 205 L 65 290 L 70 380 L 88 380 L 92 290 L 100 250 Z" fill="#0369a1" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1.5" />
            </g>

            {/* RIGHT HALF (Digital Mesh Wireframe Cybernetic Body) */}
            <g id="digital-body">
              {/* Head Right Mesh */}
              <path d="M 100 20 C 120 20, 125 40, 125 55 C 125 70, 115 80, 100 82 Z" fill="#312e81" fillOpacity="0.5" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" />
              {/* Neck & Shoulder Right Mesh */}
              <path d="M 100 82 L 125 90 L 150 110 L 160 160 L 145 160 L 135 125 L 120 110 L 100 110 Z" fill="#1e1b4b" fillOpacity="0.6" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Torso Right Mesh */}
              <path d="M 100 110 L 125 115 L 132 170 L 122 200 L 100 210 Z" fill="#312e81" fillOpacity="0.6" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Arm Right Mesh */}
              <path d="M 160 160 L 170 220 L 158 220 L 148 170 Z" fill="#1e1b4b" fillOpacity="0.6" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Pelvis & Leg Right Mesh */}
              <path d="M 100 210 L 128 205 L 135 290 L 130 380 L 112 380 L 108 290 L 100 250 Z" fill="#312e81" fillOpacity="0.6" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Wireframe Node Dots */}
              <circle cx="115" cy="50" r="3" fill="#a5b4fc" />
              <circle cx="135" cy="130" r="3" fill="#a5b4fc" />
              <circle cx="120" cy="170" r="3" fill="#a5b4fc" />
              <circle cx="120" cy="300" r="3" fill="#a5b4fc" />
            </g>

            {/* Beating Heart Visual on Chest */}
            <foreignObject x="82" y="125" width="36" height="36">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="flex items-center justify-center"
              >
                <Heart className="w-6 h-6 fill-rose-500 text-rose-400 drop-shadow-lg" />
              </motion.div>
            </foreignObject>
          </svg>
        </div>

        {/* Right Side Labels */}
        <div className="w-28 space-y-3 text-[10px] font-bold text-indigo-200/90 text-left z-10">
          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-indigo-800/70 hover:border-indigo-400 transition-colors shadow-xs">
            CLINICAL RECORDS
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-indigo-800/70 hover:border-indigo-400 transition-colors shadow-xs">
            IoMT SENSORS
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-indigo-800/70 hover:border-indigo-400 transition-colors shadow-xs">
            BIOMETRIC OMICS
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-indigo-800/70 hover:border-indigo-400 transition-colors shadow-xs">
            RECOVERY DRIFT AI
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-indigo-800/70 hover:border-indigo-400 transition-colors shadow-xs">
            ENVIRONMENTAL AI
          </div>
        </div>
      </div>

      {/* Bottom Data Pipeline Footer */}
      <div className="pt-3 border-t border-sky-800/80 flex items-center justify-between text-[10px] font-extrabold text-sky-300 relative z-10">
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
