import React from 'react';
import { motion } from 'framer-motion';

export const MedicalCrossBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-sky-50 via-slate-50 to-blue-100/60">
      {/* Soft Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" />

      {/* Layered Floating 3D Medical Crosses (Replicating Image 1) */}
      
      {/* Cross 1 - Top Right Huge Glowing Cross */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-12 -right-12 w-80 h-80 bg-white/70 backdrop-blur-md rounded-3xl border border-sky-100 shadow-xl shadow-sky-900/5 flex items-center justify-center"
      >
        <div className="w-full h-28 bg-gradient-to-r from-sky-100/80 to-white/90 absolute" />
        <div className="h-full w-28 bg-gradient-to-b from-sky-100/80 to-white/90 absolute" />
      </motion.div>

      {/* Cross 2 - Center Right Layered Cross */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 -right-8 w-64 h-64 bg-white/80 backdrop-blur-md rounded-3xl border border-sky-200/60 shadow-2xl shadow-sky-900/10 flex items-center justify-center"
      >
        <div className="w-full h-20 bg-sky-100/90 absolute" />
        <div className="h-full w-20 bg-sky-100/90 absolute" />
      </motion.div>

      {/* Cross 3 - Bottom Right Highlight Cross */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-10 right-24 w-72 h-72 bg-gradient-to-tr from-white to-sky-100/80 backdrop-blur-md rounded-3xl border border-sky-200/80 shadow-2xl shadow-sky-900/10 flex items-center justify-center"
      >
        <div className="w-full h-24 bg-sky-200/50 absolute" />
        <div className="h-full w-24 bg-sky-200/50 absolute" />
      </motion.div>

      {/* Cross 4 - Top Left Soft Floating Cross */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-10 left-10 w-48 h-48 bg-white/50 backdrop-blur-sm rounded-2xl border border-sky-100/60 shadow-lg shadow-sky-900/5 flex items-center justify-center opacity-70"
      >
        <div className="w-full h-16 bg-sky-100/50 absolute" />
        <div className="h-full w-16 bg-sky-100/50 absolute" />
      </motion.div>

      {/* Cross 5 - Bottom Left Mid Cross */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-12 -left-12 w-60 h-60 bg-white/60 backdrop-blur-md rounded-3xl border border-sky-100 shadow-xl shadow-sky-900/5 flex items-center justify-center opacity-80"
      >
        <div className="w-full h-20 bg-sky-100/60 absolute" />
        <div className="h-full w-20 bg-sky-100/60 absolute" />
      </motion.div>
    </div>
  );
};
