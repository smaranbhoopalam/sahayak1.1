import React, { useState } from 'react';
import { Calendar, Video, Clock } from 'lucide-react';
import { mockAppointments, DoctorAppointment } from '../../data/mockAppointments';

export const AppointmentsSection: React.FC = () => {
  const [activeConsultation, setActiveConsultation] = useState<DoctorAppointment | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                Today's Consultations
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {mockAppointments.length} Scheduled
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Integrated HD video teleconsultations & post-op reviews
              </p>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {mockAppointments.map((apt) => (
            <div
              key={apt.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl ${apt.patientAvatarBg} text-white font-black text-xs flex items-center justify-center shadow-xs`}>
                      {apt.patientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{apt.patientName}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-brand-500" />
                        <span className="text-brand-700 font-black">{apt.time}</span> ({apt.duration})
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                    apt.riskLevel === 'critical' || apt.riskLevel === 'high'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {apt.riskLevel} Risk
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-700 mb-3 truncate">
                  🩺 {apt.procedure}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                  📹 {apt.type}
                </span>

                <button
                  onClick={() => setActiveConsultation(apt)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  Join Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Modal */}
      {activeConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-slate-900 text-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-800 space-y-5 text-center">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">Sahayak HD Virtual Clinic</h3>
              <p className="text-xs text-slate-400">Connecting to {activeConsultation.patientName}...</p>
            </div>

            <div className="text-left bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 text-xs space-y-1">
              <p><span className="text-slate-400 font-bold">Patient:</span> <span className="font-extrabold text-white">{activeConsultation.patientName}</span></p>
              <p><span className="text-slate-400 font-bold">Procedure:</span> {activeConsultation.procedure}</p>
              <p><span className="text-slate-400 font-bold">Encrypted Channel:</span> SHA-256 Medical Grade Telehealth Stream</p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setActiveConsultation(null)}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-colors"
              >
                End Call
              </button>
              <button
                onClick={() => setActiveConsultation(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
              >
                Enter Consultation Room
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
