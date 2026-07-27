import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, CheckCircle2, ClipboardCheck, Activity, Stethoscope } from 'lucide-react';

export const RecoveryRoadmapPath: React.FC = () => {
  // Road: enters from top-RIGHT corner, curves down the LEFT side, exits at bottom-RIGHT corner
  const pathD = "M 1000 0 C 800 0, 550 80, 420 180 C 290 280, 260 380, 280 480 C 300 580, 320 680, 280 780 C 250 860, 400 950, 1000 1000";

  // 5 glowing nodes ON the road path at evenly spaced intervals
  const roadNodes = [
    { id: 1, cx: 500, cy: 135, color: '#10b981', ring: '#a7f3d0' },
    { id: 2, cx: 290, cy: 310, color: '#3b82f6', ring: '#bfdbfe' },
    { id: 3, cx: 282, cy: 495, color: '#8b5cf6', ring: '#ddd6fe' },
    { id: 4, cx: 278, cy: 700, color: '#f43f5e', ring: '#fecdd3' },
    { id: 5, cx: 560, cy: 920, color: '#10b981', ring: '#a7f3d0' },
  ];

  // Milestone metadata with alignment percentages
  const roadMilestones = [
    {
      id: 1,
      step: 'Step 1',
      title: 'You Registered! Yayyy! 🎉🥳',
      subtitle: 'Account Created & Ready',
      icon: Sparkles,
      color: 'bg-emerald-500 text-white',
      connectorPath: 'M 220 135 L 500 135',
      left: '22%',
      top: '13.5%',
    },
    {
      id: 2,
      step: 'Step 2',
      title: 'Daily Patient Status Logged! 📋',
      subtitle: 'Track your recovery vitals',
      icon: ClipboardCheck,
      color: 'bg-sky-500 text-white',
      connectorPath: 'M 220 310 L 290 310',
      left: '22%',
      top: '31%',
    },
    {
      id: 3,
      step: 'Step 3',
      title: 'Digital Twin Risk Analyzed! 🧬',
      subtitle: 'AI analyzes your recovery data',
      icon: Activity,
      color: 'bg-indigo-500 text-white',
      connectorPath: 'M 220 495 L 282 495',
      left: '22%',
      top: '49.5%',
    },
    {
      id: 4,
      step: 'Step 4',
      title: 'Doctor Virtual Check Complete! 🩺',
      subtitle: 'Attending physician approved',
      icon: Stethoscope,
      color: 'bg-rose-500 text-white',
      connectorPath: 'M 220 700 L 278 700',
      left: '22%',
      top: '70%',
    },
    {
      id: 5,
      step: 'Final Goal',
      title: 'YESSSS! Recovered Completely! 🏆🎉',
      subtitle: '100% Fit, Strong & Healthy!',
      icon: Trophy,
      color: 'bg-emerald-500 text-white',
      connectorPath: 'M 220 920 L 560 920',
      left: '22%',
      top: '92%',
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* SVG Layer stretched to cover 100% of the viewport width and height */}
      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Outer Asphalt Base */}
        <path d={pathD} stroke="#475569" strokeWidth="40" strokeLinecap="round" />
        {/* Inner Dark Road */}
        <path d={pathD} stroke="#1e293b" strokeWidth="28" strokeLinecap="round" />
        {/* Animated Dashed Center Yellow Line */}
        <motion.path
          d={pathD}
          stroke="#f59e0b"
          strokeWidth="5"
          strokeDasharray="20 14"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -280 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Dashed Connector Lines */}
        {roadMilestones.map((m) => (
          <path
            key={`line-${m.id}`}
            d={m.connectorPath}
            stroke="#0d9488"
            strokeWidth="3"
            strokeDasharray="7 5"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}

        {/* Glowing Circular Nodes on Road Track */}
        {roadNodes.map((n) => (
          <g key={`node-${n.id}`}>
            {/* Outer pulse ring */}
            <circle cx={n.cx} cy={n.cy} r="16" fill={n.ring} fillOpacity="0.55" />
            {/* Main colored node */}
            <circle cx={n.cx} cy={n.cy} r="11" fill={n.color} stroke="#ffffff" strokeWidth="3" />
            {/* Inner white dot */}
            <circle cx={n.cx} cy={n.cy} r="4" fill="#ffffff" />
          </g>
        ))}
      </svg>

      {/* HTML Milestone Cards - wrapped to isolate transform animation from layout absolute coordinates */}
      {roadMilestones.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={m.id}
            style={{
              position: 'absolute',
              left: m.left,
              top: m.top,
              transform: 'translate(calc(-100% - 12px), -50%)',
            }}
            className="pointer-events-auto z-30 cursor-pointer w-52 select-none"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xl px-3 py-2.5 rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10 w-full"
            >
              <div className={`p-1.5 rounded-xl ${m.color} shadow-md shrink-0`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[8px] font-extrabold uppercase tracking-widest text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-md">
                  {m.step}
                </span>
                <h4 className="text-[10px] font-black text-slate-900 leading-tight block mt-0.5 truncate">
                  {m.title}
                </h4>
                <p className="text-[8px] text-slate-500 truncate">
                  {m.subtitle}
                </p>
              </div>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
