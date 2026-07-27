import React from 'react';
import { motion } from 'framer-motion';

export const ScreenRadarSweep: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dark Ambient Radial Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />

      {/* Grid Mesh lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Radar Concentric Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-brand-500/15 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-brand-500/20 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-brand-500/25 rounded-full" />

      {/* Rotating 360-degree Radar Conic Beam Sweep */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px]">
        <motion.div
          className="w-full h-full rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.25)_0deg,transparent_60deg,transparent_360deg)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating Radar Blips / Target Dots */}
      <motion.div
        className="absolute top-[35%] left-[28%] w-3 h-3 rounded-full bg-brand-400 shadow-lg shadow-brand-400/80"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[62%] right-[30%] w-3 h-3 rounded-full bg-rose-400 shadow-lg shadow-rose-400/80"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.4, 0.9] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[45%] w-2.5 h-2.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/80"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 1.2 }}
      />
    </div>
  );
};
