import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RiskLevel } from '../../types';

interface StatusBadgeProps {
  status: RiskLevel | 'low' | 'medium' | 'high' | 'normal' | 'alert' | string;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'sm' }) => {
  const normStatus = status.toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let badgeLabel = label || status;

  if (normStatus === 'low' || normStatus === 'normal' || normStatus === 'low risk') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    badgeLabel = label || 'Low Risk';
  } else if (normStatus === 'medium' || normStatus === 'warning' || normStatus === 'medium risk') {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
    badgeLabel = label || 'Medium Risk';
  } else if (normStatus === 'high' || normStatus === 'alert' || normStatus === 'high risk') {
    styles = 'bg-rose-50 text-rose-700 border-rose-200';
    badgeLabel = label || 'High Risk';
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold',
    md: 'px-3 py-1 text-sm font-semibold',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-full border tracking-wide uppercase',
          styles,
          sizes[size]
        )
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {badgeLabel}
    </span>
  );
};
