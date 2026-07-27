import React from 'react';
import { Card } from '../common/Card';
import { Activity, TrendingUp, AlertTriangle } from 'lucide-react';

interface RecoveryScoreCardProps {
  confidenceScore: number; // e.g. 92
  driftIndex: number; // e.g. 0.8
  lastUpdated?: string;
}

export const RecoveryScoreCard: React.FC<RecoveryScoreCardProps> = ({
  confidenceScore,
  driftIndex,
  lastUpdated = 'Today at 09:30 AM',
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Confidence Score Card */}
      <Card bordered hoverable className="relative overflow-hidden bg-gradient-to-br from-white to-brand-50/40">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
              Recovery Confidence Score
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900">{confidenceScore}%</span>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +4.2% this week
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              High confidence based on daily mobility & pain progression logs.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-brand-500 text-white shadow-md shadow-brand-500/20">
            <Activity className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Synced with Sahayak Engine</span>
          <span>{lastUpdated}</span>
        </div>
      </Card>

      {/* Recovery Drift Index Card */}
      <Card bordered hoverable className="relative overflow-hidden bg-gradient-to-br from-white to-amber-50/30">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
              Recovery Drift Index
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900">{driftIndex}</span>
              <span className="text-xs text-slate-500 font-medium">/ 5.0 (Optimal &lt; 1.5)</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Low drift indicates your healing trajectory matches predicted protocol timelines.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Deviation Risk: Minimal</span>
          <span>Updated Daily</span>
        </div>
      </Card>
    </div>
  );
};
