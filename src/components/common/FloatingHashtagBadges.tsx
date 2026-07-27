import React from 'react';
import { motion } from 'framer-motion';

// Hashtags spread across ALL corners/edges of the screen
// Carefully placed to avoid overlap with:
// - Left side cards (0%–25% x range)
// - Center login portal (32%–68% x, 5%–95% y)
// - Road nodes
export const FloatingHashtagBadges: React.FC = () => {
  const hashtags = [
    // TOP edge — clear of portal center
    { text: '#HealthyLife 🌿',       color: 'bg-emerald-50 border-emerald-200 text-emerald-700', x: '78%', y: '4%',  delay: 0   },
    { text: '#FitAndStrong 💪',      color: 'bg-sky-50 border-sky-200 text-sky-700',             x: '88%', y: '20%', delay: 0.6 },
    // RIGHT edge — safe zone right of portal
    { text: '#DigitalTwinSync 🧬',   color: 'bg-indigo-50 border-indigo-200 text-indigo-700',    x: '82%', y: '40%', delay: 1.2 },
    { text: '#SahayakAiCare 🤖',     color: 'bg-purple-50 border-purple-200 text-purple-700',    x: '87%', y: '60%', delay: 1.8 },
    // BOTTOM edge — clear of step cards and portal
    { text: '#ZeroReadmission 🛡️',  color: 'bg-rose-50 border-rose-200 text-rose-700',           x: '72%', y: '80%', delay: 2.4 },
    { text: '#PostOpRecovery 🏥',    color: 'bg-teal-50 border-teal-200 text-teal-700',           x: '83%', y: '94%', delay: 0.3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {hashtags.map((h, i) => (
        <motion.div
          key={i}
          animate={{ y: [-7, 7, -7] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: h.delay }}
          style={{ left: h.x, top: h.y }}
          className={`absolute px-3 py-1.5 rounded-full border backdrop-blur-md shadow-md text-[11px] font-extrabold pointer-events-auto cursor-pointer hover:scale-110 transition-transform ${h.color}`}
        >
          {h.text}
        </motion.div>
      ))}
    </div>
  );
};
