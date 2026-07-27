import React from 'react';
import { Card } from '../common/Card';
import { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconBg?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  iconBg = 'bg-brand-500 text-white',
}) => {
  return (
    <Card bordered hoverable className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{value}</span>
            {change && (
              <span
                className={`text-xs font-semibold ${
                  changeType === 'positive'
                    ? 'text-emerald-600'
                    : changeType === 'negative'
                    ? 'text-rose-600'
                    : 'text-slate-500'
                }`}
              >
                {change}
              </span>
            )}
          </div>
        </div>
        <div className={`p-3.5 rounded-2xl shadow-sm shrink-0 ${iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};
