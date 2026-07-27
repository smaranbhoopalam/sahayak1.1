import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, FileText, Calendar, Activity, MessageSquare, CheckCircle2 } from 'lucide-react';

export const QuickActionsPanel: React.FC = () => {
  const navigate = useNavigate();
  const [showMsgToast, setShowMsgToast] = useState(false);

  const triggerMessage = () => {
    setShowMsgToast(true);
    setTimeout(() => setShowMsgToast(false), 3000);
  };

  const actions = [
    {
      title: 'Review Patient',
      desc: 'Open patient clinical file',
      icon: UserCheck,
      color: 'bg-brand-50 text-brand-600 border-brand-200 hover:bg-brand-100',
      onClick: () => navigate('/doctor/patient/PAT-101'),
    },
    {
      title: 'Generate Report',
      desc: 'Download clinical summaries',
      icon: FileText,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100',
      onClick: () => navigate('/doctor/reports'),
    },
    {
      title: 'Schedule Appointment',
      desc: 'Book teleconsultation slot',
      icon: Calendar,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100',
      onClick: () => navigate('/doctor/appointments'),
    },
    {
      title: 'View Digital Twin',
      desc: '3D motion capture sync',
      icon: Activity,
      color: 'bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100',
      onClick: () => navigate('/doctor/digital-twin'),
    },
    {
      title: 'Message Patient',
      desc: 'Send care instructions',
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
      onClick: triggerMessage,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3 relative">
      {/* Toast Notification */}
      {showMsgToast && (
        <div className="absolute top-3 right-4 z-20 bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Patient messaging console opened!</span>
        </div>
      )}

      <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
        Clinical Quick Actions
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((act, i) => {
          const Icon = act.icon;
          return (
            <button
              key={i}
              onClick={act.onClick}
              className={`p-3.5 rounded-xl border transition-all text-left group flex flex-col justify-between ${act.color}`}
            >
              <div className="p-2 rounded-lg bg-white shadow-xs w-fit mb-2 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block leading-tight">
                  {act.title}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block truncate mt-0.5">
                  {act.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
