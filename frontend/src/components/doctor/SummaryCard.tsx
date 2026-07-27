import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: string;
  trendType: 'positive' | 'negative' | 'neutral';
  description: string;
  icon: React.ElementType;
  iconBgColor?: string;
  iconTextColor?: string;
  sparkline: number[];
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  trend,
  trendType,
  description,
  icon: Icon,
  iconBgColor = 'bg-brand-50',
  iconTextColor = 'text-brand-600',
  sparkline,
}) => {
  // Sparkline SVG path generation
  const maxVal = Math.max(...sparkline, 1);
  const minVal = Math.min(...sparkline, 0);
  const range = maxVal - minVal || 1;
  const points = sparkline
    .map((val, idx) => {
      const x = (idx / (sparkline.length - 1)) * 120;
      const y = 36 - ((val - minVal) / range) * 28;
      return `${x},${y}`;
    })
    .join(' ');

  const strokeColor =
    trendType === 'positive' ? '#10b981' : trendType === 'negative' ? '#f43f5e' : '#6366f1';

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {prefix}
              {value}
              {suffix}
            </span>
          </div>
        </div>

        <div className={`p-3 rounded-2xl ${iconBgColor} ${iconTextColor} shrink-0 shadow-xs`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Sparkline & Trend Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-black px-2 py-0.5 rounded-full ${
              trendType === 'positive'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                : trendType === 'negative'
                ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {trendType === 'positive' ? (
              <TrendingUp className="w-3 h-3" />
            ) : trendType === 'negative' ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            {trend}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 truncate">{description}</span>
        </div>

        {/* Small Sparkline SVG */}
        <div className="w-20 h-8 shrink-0">
          <svg viewBox="0 0 120 36" className="w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
