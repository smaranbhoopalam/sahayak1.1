import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, Sparkles, ExternalLink, ShieldAlert } from 'lucide-react';
import { DoctorPatient } from '../../data/mockPatients';

interface HighRiskPanelProps {
  patients: DoctorPatient[];
}

export const HighRiskPanel: React.FC<HighRiskPanelProps> = ({ patients }) => {
  const navigate = useNavigate();
  const [selectedPatientForContact, setSelectedPatientForContact] = useState<DoctorPatient | null>(null);

  const highRiskPatients = patients.filter(
    (p) => p.riskLevel === 'critical' || p.riskLevel === 'high'
  );

  return (
    <>
      <div className="bg-gradient-to-br from-rose-50/70 via-white to-amber-50/50 rounded-2xl p-5 border border-rose-200/80 shadow-xs relative overflow-hidden">
        {/* Decorative Alert Watermark */}
        <ShieldAlert className="absolute -right-6 -bottom-6 w-36 h-36 text-rose-500/5 pointer-events-none" />

        {/* Panel Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500 text-white shadow-md shadow-rose-500/20 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                High Risk Watchlist
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white">
                  {highRiskPatients.length} Patients
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Sahayak AI detected drift anomalies requiring physician review
              </p>
            </div>
          </div>
        </div>

        {/* Patients List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {highRiskPatients.map((patient) => (
            <motion.div
              key={patient.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl p-4 border border-rose-100 shadow-xs hover:shadow-md hover:border-rose-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl ${patient.avatarBg || 'bg-rose-500'} text-white font-black text-xs flex items-center justify-center shadow-xs`}>
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{patient.name}</h4>
                      <p className="text-[11px] text-slate-500 font-semibold">{patient.age} yrs • {patient.gender}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    patient.riskLevel === 'critical'
                      ? 'bg-rose-500 text-white shadow-xs shadow-rose-500/30 animate-pulse'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {patient.riskLevel} Risk
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-700 mb-2 truncate">
                  🩺 {patient.procedure}
                </p>

                {/* AI Alert Message Card */}
                {patient.aiAlert && (
                  <div className="mb-3 p-2.5 rounded-lg bg-rose-50/80 border border-rose-200/80 text-[11px] text-rose-900 font-semibold flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-rose-600 mt-0.5 shrink-0" />
                    <span className="leading-snug">{patient.aiAlert}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Patient
                </button>
                <button
                  onClick={() => setSelectedPatientForContact(patient)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Contact
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Patient Modal */}
      <AnimatePresence>
        {selectedPatientForContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-600" /> Contact {selectedPatientForContact.name}
                </h3>
                <button
                  onClick={() => setSelectedPatientForContact(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <p className="font-extrabold text-slate-800">Direct Phone:</p>
                  <p className="text-sm font-black text-brand-700 flex items-center gap-2">
                    📞 {selectedPatientForContact.phone}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <p className="font-extrabold text-slate-800">Email Address:</p>
                  <p className="text-sm font-black text-brand-700 flex items-center gap-2">
                    ✉️ {selectedPatientForContact.email}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <p className="font-extrabold">Emergency Protocol Active</p>
                  <p className="text-[11px] mt-0.5">Automated SMS care alert sent to guardian.</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedPatientForContact(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <a
                  href={`tel:${selectedPatientForContact.phone}`}
                  onClick={() => setSelectedPatientForContact(null)}
                  className="px-4 py-2 rounded-xl bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Now
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
