import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { GitCommitHorizontal, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockTimelineItems } from '../../data/mockData';

export const TimelinePreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card bordered hoverable className="bg-white">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-brand-50 text-brand-600">
            <GitCommitHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Recovery Timeline</h3>
            <p className="text-xs text-slate-500">Day 12 of 30 Milestone Progression</p>
          </div>
        </div>
        <Button
          onClick={() => navigate('/patient/timeline')}
          variant="ghost"
          size="sm"
          icon={<ChevronRight className="w-4 h-4" />}
          iconPosition="right"
        >
          View All Days
        </Button>
      </div>

      {/* Mini Stepper Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {mockTimelineItems.slice(2, 5).map((item) => {
          const isDone = item.status === 'completed';
          const isCurrent = item.status === 'current';
          return (
            <div
              key={item.id}
              onClick={() => navigate('/patient/timeline')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-brand-50/60 border-brand-300 ring-2 ring-brand-500/20'
                  : isDone
                  ? 'bg-slate-50/70 border-slate-200'
                  : 'bg-white border-slate-100 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-extrabold text-slate-800">Day {item.dayNumber}</span>
                {isDone ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-slate-300" />
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
