import React from 'react';
import { motion } from 'framer-motion';

export interface InteractiveBodyTwinProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  regionStatuses: Record<string, 'healthy' | 'healing' | 'attention' | 'critical'>;
  compareMode?: boolean;
  dayValue?: number;
}

export const InteractiveBodyTwin: React.FC<InteractiveBodyTwinProps> = ({
  selectedRegion,
  onSelectRegion,
  regionStatuses,
  compareMode = false,
  dayValue = 12,
}) => {
  // Define colors matching requirements
  const colors = {
    healthy: { fill: 'rgba(16, 185, 129, 0.25)', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
    healing: { fill: 'rgba(59, 130, 246, 0.25)', stroke: '#3b82f6', glow: 'rgba(59, 130, 246, 0.4)' },
    attention: { fill: 'rgba(245, 158, 11, 0.25)', stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
    critical: { fill: 'rgba(239, 68, 68, 0.25)', stroke: '#ef6868', glow: 'rgba(239, 68, 68, 0.4)' },
  };

  // Human body paths defined inside a clean SVG layout
  const regions = [
    { id: 'head', name: 'Head', path: 'M 100 45 C 90 45, 85 20, 100 15 C 115 20, 110 45, 100 45 Z' },
    { id: 'neck', name: 'Neck', path: 'M 96 45 L 104 45 L 103 55 L 97 55 Z' },
    { id: 'chest', name: 'Chest', path: 'M 90 55 L 110 55 L 115 90 L 85 90 Z' },
    { id: 'abdomen', name: 'Abdomen', path: 'M 85 90 L 115 90 L 112 125 L 88 125 Z' },
    { id: 'leftArm', name: 'Left Arm', path: 'M 85 57 L 70 85 L 62 115 L 56 125 L 63 125 L 72 110 L 85 85 Z' },
    { id: 'rightArm', name: 'Right Arm', path: 'M 115 57 L 130 85 L 138 115 L 144 125 L 137 125 L 128 110 L 115 85 Z' },
    { id: 'leftLeg', name: 'Left Leg', path: 'M 88 125 L 85 160 L 83 200 L 75 200 L 78 160 L 88 125 Z' },
    { id: 'rightLeg', name: 'Right Leg', path: 'M 112 125 L 115 160 L 117 200 L 125 200 L 122 160 L 112 125 Z' },
    { id: 'knees', name: 'Knees', path: 'M 72 200 L 86 200 L 85 214 L 73 214 Z M 114 200 L 128 200 L 127 214 L 115 214 Z' },
    { id: 'feet', name: 'Feet', path: 'M 73 214 L 85 214 L 83 238 L 71 238 Z M 115 214 L 127 214 L 129 238 L 117 238 Z' },
  ];

  return (
    <div className="relative w-full h-[460px] bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 shadow-inner overflow-hidden select-none">
      {/* HUD Scanner lines */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
        </span>
        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
          {compareMode ? `Twin Timeline comparison: Day ${dayValue}` : `Live AI Bio-Telemetry`}
        </span>
      </div>

      {/* SVG Human model workspace */}
      <svg
        viewBox="0 0 200 250"
        className="w-full h-[90%] max-w-[320px] transition-all duration-300 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.15)]"
      >
        {/* Glow Filters */}
        <defs>
          <filter id="glow-healthy" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-healing" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-attention" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-critical" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Grid overlay in SVG */}
        <g opacity="0.15">
          <line x1="100" y1="10" x2="100" y2="240" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="20" y1="125" x2="180" y2="125" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
        </g>

        {/* Body Regions */}
        {regions.map((reg) => {
          const status = regionStatuses[reg.id] || 'healthy';
          const isSelected = selectedRegion === reg.id;
          const style = colors[status];

          return (
            <g key={reg.id} className="cursor-pointer">
              {/* Region Glow Aura */}
              <motion.path
                d={reg.path}
                fill={isSelected ? style.glow : 'transparent'}
                stroke={isSelected ? style.stroke : 'transparent'}
                strokeWidth={isSelected ? '6' : '0'}
                opacity={isSelected ? 0.8 : 0}
                filter={`url(#glow-${status})`}
                transition={{ duration: 0.2 }}
              />

              {/* Main Body Path */}
              <motion.path
                d={reg.path}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={isSelected ? '2.5' : '1.5'}
                onClick={() => onSelectRegion(reg.id)}
                whileHover={{
                  fill: style.glow,
                  strokeWidth: 2,
                  scale: 1.01,
                }}
                animate={
                  status === 'critical' || isSelected
                    ? { opacity: [0.75, 1, 0.75] }
                    : { opacity: 0.9 }
                }
                transition={
                  status === 'critical' || isSelected
                    ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                    : undefined
                }
              />

              {/* Glow Dot Indicator for critical/attention areas */}
              {(status === 'critical' || status === 'attention') && reg.id === 'knees' && (
                <circle
                  cx="100"
                  cy="207"
                  r="5"
                  fill={style.stroke}
                  className="animate-ping"
                  opacity="0.75"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
