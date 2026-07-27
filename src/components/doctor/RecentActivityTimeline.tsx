import React from 'react';
import { Activity, Clock, CheckCircle2, MessageSquare, Bell, AlertTriangle } from 'lucide-react';

interface ActivityItem {
  id: string;
  time: string;
  patientName: string;
  action: string;
  details: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: 'ACT-1',
    time: '10 mins ago',
    patientName: 'Priya Patel',
    action: 'Submitted Daily Recovery Check-in',
    details: 'Pain score logged at 7/10. Flexor stiffness flagged by Sahayak AI Engine.',
    icon: AlertTriangle,
    iconBg: 'bg-rose-50 border-rose-200',
    iconColor: 'text-rose-600',
  },
  {
    id: 'ACT-2',
    time: '35 mins ago',
    patientName: 'Vikram Singh',
    action: 'Sahayak AI Engine Score Recalibrated',
    details: 'Drift index updated to 2.9 due to post-CABG heart rate variability.',
    icon: Activity,
    iconBg: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
  },
  {
    id: 'ACT-3',
    time: '1 hour ago',
    patientName: 'Rahul Sharma',
    action: 'Doctor Clinical Comment Added',
    details: 'Dr. Ananya Roy approved Stage 3 quadriceps strengthening exercises.',
    icon: MessageSquare,
    iconBg: 'bg-brand-50 border-brand-200',
    iconColor: 'text-brand-600',
  },
  {
    id: 'ACT-4',
    time: '2 hours ago',
    patientName: 'Karan Mehta',
    action: 'Automated Medication Reminder Sent',
    details: 'Push notification & SMS sent for afternoon Anti-inflammatory Rx.',
    icon: Bell,
    iconBg: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'ACT-5',
    time: '4 hours ago',
    patientName: 'Ananya Gupta',
    action: 'ROM Milestone Achieved',
    details: 'Digital Twin motion capture verified shoulder abduction ROM at 145° (+15° increase).',
    icon: CheckCircle2,
    iconBg: 'bg-emerald-50 border-emerald-200',
    iconColor: 'text-emerald-600',
  },
];

export const RecentActivityTimeline: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Recent Patient Activity</h3>
            <p className="text-xs text-slate-500 font-semibold">Live clinical audit trail & telemetry feed</p>
          </div>
        </div>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
        {mockActivities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="relative flex items-start justify-between gap-3">
              {/* Dot Icon */}
              <div className={`absolute -left-6 top-0.5 p-1 rounded-full border shadow-xs ${act.iconBg} ${act.iconColor}`}>
                <Icon className="w-3 h-3" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900">{act.patientName}</span>
                  <span className="text-[11px] font-bold text-brand-600">• {act.action}</span>
                </div>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">{act.details}</p>
              </div>

              <span className="text-[10px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {act.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
