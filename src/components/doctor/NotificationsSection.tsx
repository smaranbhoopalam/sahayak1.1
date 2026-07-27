import React from 'react';
import { Bell, Pill, TrendingUp, Calendar, ShieldAlert } from 'lucide-react';
import { mockNotifications } from '../../data/mockNotifications';
import { useNavigate } from 'react-router-dom';

export const NotificationsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              Notifications & Critical Care Alerts
              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white">
                {mockNotifications.filter((n) => !n.read).length} Unread
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-semibold">Priority alerts from patient sensors and questionnaires</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {mockNotifications.map((notif) => {
          return (
            <div
              key={notif.id}
              onClick={() => navigate(`/doctor/patient/${notif.patientId}`)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                notif.type === 'high_risk'
                  ? 'bg-rose-50/50 border-rose-200 hover:border-rose-300'
                  : notif.type === 'medication_missed'
                  ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                  : notif.type === 'appointment'
                  ? 'bg-indigo-50/50 border-indigo-200 hover:border-indigo-300'
                  : 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    {notif.type === 'high_risk' && <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />}
                    {notif.type === 'medication_missed' && <Pill className="w-3.5 h-3.5 text-amber-600" />}
                    {notif.type === 'appointment' && <Calendar className="w-3.5 h-3.5 text-indigo-600" />}
                    {notif.type === 'recovery_improved' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
                    {notif.patientName}
                  </span>

                  <span className="text-[10px] font-bold text-slate-400">{notif.timestamp}</span>
                </div>

                <h4 className="text-xs font-black text-slate-900 mb-1">{notif.title}</h4>
                <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">{notif.message}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-brand-600 hover:underline flex items-center gap-1">
                  View Patient Chart →
                </span>
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
