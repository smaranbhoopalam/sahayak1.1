import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, PhoneCall, MessageSquare, History, BarChart2, Settings,
  CheckCircle2, UserCheck, X, Search
} from 'lucide-react';
import { Card } from '../../components/common/Card';

interface OfflinePatient {
  id: string;
  name: string;
  phone: string;
  procedure: string;
  recoveryDay: number;
  language: string; // English, Hindi, Kannada
  commMode: 'IVR' | 'SMS' | 'Both';
  hospital: string;
  lastCallStatus: 'Completed' | 'Pending' | 'Failed';
  confidenceScore: number;
}

const mockOfflinePatients: OfflinePatient[] = [
  {
    id: 'PAT-101',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    procedure: 'Post-ACL Reconstruction',
    recoveryDay: 12,
    language: 'English',
    commMode: 'Both',
    hospital: 'AIIMS New Delhi',
    lastCallStatus: 'Completed',
    confidenceScore: 92,
  },
  {
    id: 'PAT-102',
    name: 'Priya Patel',
    phone: '+91 91234 56789',
    procedure: 'Total Knee Replacement',
    recoveryDay: 17,
    language: 'Hindi (हिंदी)',
    commMode: 'IVR',
    hospital: 'AIIMS New Delhi',
    lastCallStatus: 'Pending',
    confidenceScore: 58,
  },
  {
    id: 'PAT-103',
    name: 'Amit Verma',
    phone: '+91 99887 76655',
    procedure: 'Laparoscopic Appendectomy',
    recoveryDay: 7,
    language: 'English',
    commMode: 'SMS',
    hospital: 'Fortis Healthcare',
    lastCallStatus: 'Completed',
    confidenceScore: 81,
  },
  {
    id: 'PAT-105',
    name: 'Vikram Singh',
    phone: '+91 98100 99887',
    procedure: 'Coronary Artery Bypass (CABG)',
    recoveryDay: 19,
    language: 'Hindi (हिंदी)',
    commMode: 'IVR',
    hospital: 'Max Super Speciality',
    lastCallStatus: 'Completed',
    confidenceScore: 61,
  },
  {
    id: 'PAT-109',
    name: 'Karan Mehta',
    phone: '+91 95432 10987',
    procedure: 'Meniscus Repair',
    recoveryDay: 21,
    language: 'Kannada (ಕನ್ನಡ)',
    commMode: 'IVR',
    hospital: 'AIIMS New Delhi',
    lastCallStatus: 'Failed',
    confidenceScore: 66,
  },
];

import { useProfile } from '../../context/ProfileContext';

const ivrQuestions = [
  { step: 1, key: 'medication', text: "Question 1. Have you taken today's medicine?", options: "Press 1 for Yes | Press 2 for No" },
  { step: 2, key: 'pain_level', text: "Question 2. Rate your current pain level.", options: "Press a number between 1 and 10 on your keypad" },
  { step: 3, key: 'exercise', text: "Question 3. Did you complete today's exercises?", options: "Press 1 for Yes | Press 2 for No" },
  { step: 4, key: 'swelling', text: "Question 4. Do you have swelling at the operated site?", options: "Press 1 for Mild | Press 2 for Moderate | Press 3 for Severe" },
  { step: 5, key: 'callback', text: "Question 5. Would you like a doctor callback today?", options: "Press 1 for Yes | Press 2 for No" },
];

export const OfflineRecoveryPage: React.FC = () => {
  const navigate = useNavigate();
  const { patientName, patientPhone } = useProfile();

  // Dynamically map the patient roster to use context data
  const patientsList: OfflinePatient[] = [
    {
      id: 'PAT-101',
      name: patientName,
      phone: patientPhone,
      procedure: 'Post-ACL Reconstruction',
      recoveryDay: 12,
      language: 'English',
      commMode: 'Both',
      hospital: 'AIIMS New Delhi',
      lastCallStatus: 'Completed',
      confidenceScore: 92,
    },
    ...mockOfflinePatients.slice(1) // Keep the rest of the mock roster
  ];

  // Active Tab: dashboard | patients | ivr | sms | history | reports | settings
  const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'ivr' | 'sms' | 'history' | 'reports' | 'settings'>('dashboard');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<string>('All');

  // Live Call Modal State
  const [activeCallPatient, setActiveCallPatient] = useState<OfflinePatient | null>(null);
  const [callState, setCallState] = useState<'calling' | 'dialing' | 'connected' | 'completed'>('calling');
  const [callDuration, setCallDuration] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [callLogs, setCallLogs] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState('');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  // Handle Call Timer
  useEffect(() => {
    let timer: any;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  // Initiate Call function connecting to backend API
  const handleStartCall = async (patient: OfflinePatient) => {
    setActiveCallPatient(patient);
    setCallState('calling');
    setCallDuration(0);
    setCurrentStep(1);
    setUserAnswers({});
    setCallLogs([`[00:00] Initiating Exotel IVR outbound voice call to ${patient.phone}...`]);

    try {
      // Call Exotel Backend Endpoint
      const res = await fetch('http://localhost:8000/api/ivr/start-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patient.id,
          phone_number: patient.phone,
        }),
      });

      const data = await res.json();
      setSessionId(data.session_id || `SES-${Date.now().toString().slice(-6)}`);

      setTimeout(() => {
        setCallState('dialing');
        setCallLogs((prev) => [...prev, `[00:02] Dialing ${patient.phone} via Exotel Gateway (SID: ${data.call_sid || 'EX99420'})`]);
      }, 1200);

      setTimeout(() => {
        setCallState('connected');
        setCallLogs((prev) => [
          ...prev,
          `[00:04] Call Connected. Executing Exotel XML Flow...`,
          `[00:05] Prompting Q1: "${ivrQuestions[0].text}"`,
        ]);
      }, 2800);
    } catch (err) {
      // Fallback for standalone demo if backend is initializing
      setSessionId(`SES-${Date.now().toString().slice(-6)}`);
      setTimeout(() => setCallState('dialing'), 1200);
      setTimeout(() => {
        setCallState('connected');
        setCallLogs([
          `[00:00] Initiating IVR call to ${patient.phone}...`,
          `[00:02] Connecting Exotel Voice Gateway...`,
          `[00:04] Call Connected. Prompting Q1: "${ivrQuestions[0].text}"`,
        ]);
      }, 2500);
    }
  };

  // Handle DTMF Keypad Press
  const handleKeyPress = async (digit: string) => {
    if (callState !== 'connected') return;

    const currentQ = ivrQuestions[currentStep - 1];
    const newAnswers = { ...userAnswers, [currentQ.key]: digit };
    setUserAnswers(newAnswers);

    setCallLogs((prev) => [
      ...prev,
      `[00:${callDuration < 10 ? '0' + callDuration : callDuration}] DTMF Key Pressed: "${digit}" for ${currentQ.key}`,
    ]);

    // Send answer to FastAPI backend
    try {
      await fetch('http://localhost:8000/api/ivr/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          step_number: currentStep,
          dtmf_digit: digit,
        }),
      });
    } catch (e) {
      // ignore
    }

    if (currentStep < 5) {
      const nextQ = ivrQuestions[currentStep];
      setCurrentStep(currentStep + 1);
      setCallLogs((prev) => [...prev, `Prompting Q${currentStep + 1}: "${nextQ.text}"`]);
    } else {
      // Last Step -> Finish Session
      setCallState('completed');
      setCallLogs((prev) => [
        ...prev,
        `[00:${callDuration}] All 5 IVR responses gathered. Hanging up Twilio call.`,
        `Calculating Sahayak Recovery Engine Scores...`,
        `Digital Twin updated. Doctor Dashboard synced!`,
      ]);

      // Call Backend Finish API
      try {
        await fetch('http://localhost:8000/api/ivr/finish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
      } catch (err) {
        // ignore
      }
    }
  };

  // Filtered Patients List
  const filteredPatients = patientsList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone.includes(searchTerm);
    const matchesComm = filterMode === 'All' || p.commMode === filterMode;
    return matchesSearch && matchesComm;
  });

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 lg:p-8 text-white shadow-xl shadow-slate-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" /> Offline Recovery Center
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-white/10 text-white border border-white/15">
              Real Exotel Voice & IVR Gateway
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Automated Voice Check-in Portal 📞
          </h1>
          <p className="text-xs text-slate-300 font-semibold max-w-2xl">
            Empowering post-op patients without smartphones or internet access to complete daily recovery check-ins via real interactive voice calls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleStartCall(patientsList[0])}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Phone className="w-4 h-4" /> Start Express IVR Call
          </button>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {[
          { id: 'dashboard', label: 'IVR Dashboard', icon: BarChart2 },
          { id: 'patients', label: 'Patient Roster', icon: UserCheck },
          { id: 'ivr', label: 'IVR Calls Console', icon: PhoneCall },
          { id: 'sms', label: 'SMS Service', icon: MessageSquare },
          { id: 'history', label: 'Call History', icon: History },
          { id: 'settings', label: 'Telephony Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-extrabold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-700 bg-emerald-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: DASHBOARD */}
      {(activeTab === 'dashboard' || activeTab === 'ivr') && (
        <div className="space-y-6">
          {/* IVR Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card bordered className="bg-white p-4">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Calls Today</span>
              <span className="text-2xl font-black text-slate-900 block mt-1">18</span>
              <span className="text-[10px] font-bold text-emerald-600">100% Scheduled</span>
            </Card>
            <Card bordered className="bg-white p-4">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Completed Calls</span>
              <span className="text-2xl font-black text-emerald-600 block mt-1">14</span>
              <span className="text-[10px] font-bold text-slate-500">77.7% Success</span>
            </Card>
            <Card bordered className="bg-white p-4">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Pending Calls</span>
              <span className="text-2xl font-black text-amber-600 block mt-1">3</span>
              <span className="text-[10px] font-bold text-amber-600">In Queue</span>
            </Card>
            <Card bordered className="bg-white p-4">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Failed Calls</span>
              <span className="text-2xl font-black text-rose-600 block mt-1">1</span>
              <span className="text-[10px] font-bold text-rose-600">Retry Scheduled</span>
            </Card>
            <Card bordered className="bg-white p-4">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Average Duration</span>
              <span className="text-2xl font-black text-brand-600 block mt-1">1m 25s</span>
              <span className="text-[10px] font-bold text-slate-500">Fast DTMF Answer</span>
            </Card>
          </div>

          {/* Recent IVR Calls Table */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                Recent IVR Voice Sessions
              </h3>
              <span className="text-xs font-extrabold text-emerald-600">Twilio Telephony Gateway Active</span>
            </div>

            <div className="space-y-3">
              {patientsList.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{patient.name}</h4>
                      <p className="text-[11px] font-semibold text-slate-500">{patient.phone} • {patient.language}</p>
                    </div>
                  </div>

                  <div className="min-w-[180px]">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Procedure</span>
                    <span className="text-xs font-bold text-slate-800">{patient.procedure}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      patient.lastCallStatus === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : patient.lastCallStatus === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {patient.lastCallStatus}
                    </span>

                    <button
                      onClick={() => handleStartCall(patient)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PATIENT ROSTER TABLE */}
      {activeTab === 'patients' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900">Offline Recovery Patient Roster</h3>
              <p className="text-xs text-slate-500 font-semibold">Patients enrolled in IVR & SMS automated tele-triage</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <option value="All">All Modes</option>
                <option value="IVR">IVR Only</option>
                <option value="SMS">SMS Only</option>
                <option value="Both">Both (IVR + SMS)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-[240px]">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{patient.name}</h4>
                    <p className="text-[11px] font-semibold text-slate-500">{patient.phone} • {patient.hospital}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Procedure & Day</span>
                  <span className="text-xs font-bold text-slate-800">{patient.procedure} (Day {patient.recoveryDay})</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Language & Mode</span>
                  <span className="text-xs font-bold text-slate-800">{patient.language} • <span className="text-emerald-700 font-black">{patient.commMode}</span></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartCall(patient)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Now
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5" /> View History
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SMS */}
      {activeTab === 'sms' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900">SMS Tele-triage Module</h3>
          <p className="text-xs text-slate-500">Automated SMS check-in prompts & responses for feature phone users.</p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <p className="font-extrabold text-emerald-800">✉️ SMS Outbound Broadcast Engine Active</p>
            <p>124 SMS check-in messages delivered today via Twilio Messaging Service.</p>
          </div>
        </div>
      )}

      {/* TAB 4: CALL HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900">IVR Call History & Telemetry Logs</h3>
              <p className="text-xs text-slate-500 font-semibold">Recorded DTMF keypad answers and calculated confidence scores</p>
            </div>
          </div>

          <div className="space-y-4">
            {patientsList.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-black text-slate-900">{p.name}</span>
                    <span className="text-slate-500 font-semibold ml-2">({p.phone})</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">July 27, 2026 • 09:30 AM</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px] font-semibold">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-bold">1. Medicine Taken</span>
                    <span className="font-black text-emerald-700">Yes (Key 1)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-bold">2. Pain Score</span>
                    <span className="font-black text-slate-800">3/10 (Key 3)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-bold">3. Exercises Done</span>
                    <span className="font-black text-emerald-700">Yes (Key 1)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-bold">4. Swelling Level</span>
                    <span className="font-black text-amber-700">Mild (Key 1)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-bold">5. Doctor Callback</span>
                    <span className="font-black text-slate-500">No (Key 2)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-extrabold pt-2 border-t border-slate-200 text-slate-600">
                  <span>Confidence Score: <strong className="text-emerald-600">92.0%</strong></span>
                  <span>Drift Index: <strong className="text-slate-800">0.8</strong></span>
                  <span className="text-emerald-700">Digital Twin Updated ✨</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIVE CALL MODAL / DIALER SCREEN */}
      <AnimatePresence>
        {activeCallPatient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 text-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-800 space-y-5"
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    {activeCallPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">{activeCallPatient.name}</h3>
                    <p className="text-xs text-slate-400 font-semibold">{activeCallPatient.phone} • {activeCallPatient.procedure}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCallPatient(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Call Status Indicator */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="flex h-3 w-3 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${callState === 'completed' ? 'bg-emerald-400' : 'bg-rose-400'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${callState === 'completed' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                  </span>
                  <span className="text-xs font-black tracking-wider uppercase text-emerald-400">
                    {callState === 'calling' && 'Initiating Exotel Outbound Call...'}
                    {callState === 'dialing' && 'Ringing Patient Phone...'}
                    {callState === 'connected' && `Call Connected • 00:${callDuration < 10 ? '0' + callDuration : callDuration}`}
                    {callState === 'completed' && 'Call Completed • Responses Synced'}
                  </span>
                </div>

                {callState === 'connected' && (
                  <div className="text-xs text-slate-300 font-semibold pt-1">
                    Language: <span className="text-emerald-400 font-bold">{activeCallPatient.language}</span> • Provider: <span className="text-brand-400 font-bold">Exotel Voice API</span>
                  </div>
                )}
              </div>

              {/* Questionnaire & DTMF Keypad (When Connected) */}
              {callState === 'connected' && (
                <div className="space-y-4">
                  {/* Current Question */}
                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-extrabold uppercase">
                      <span>Question {currentStep} of 5</span>
                      <span>Keypad Input Gather</span>
                    </div>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      {ivrQuestions[currentStep - 1].text}
                    </p>
                    <p className="text-xs text-emerald-400 font-semibold">
                      {ivrQuestions[currentStep - 1].options}
                    </p>
                  </div>

                  {/* Simulated Keypad for Doctor/Admin Testing */}
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase block mb-2 text-center">
                      Phone Keypad (DTMF Key Simulator)
                    </span>
                    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                        <button
                          key={key}
                          onClick={() => handleKeyPress(key)}
                          className="py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-white border border-slate-700 text-slate-200 font-black text-sm transition-all active:scale-95 cursor-pointer"
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Call Completed Screen */}
              {callState === 'completed' && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-base font-black text-white">Call Successfully Completed!</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 block">Confidence</span>
                      <span className="font-black text-emerald-400">92.0%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 block">Drift Index</span>
                      <span className="font-black text-white">0.8</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 block">Digital Twin</span>
                      <span className="font-black text-cyan-400">Updated ✨</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Live Telemetry Call Logs */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1 max-h-32 overflow-y-auto">
                <span className="text-[9px] text-slate-500 font-bold uppercase block font-sans">Live Exotel Call Log</span>
                {callLogs.map((log, i) => (
                  <p key={i} className="text-slate-300">{log}</p>
                ))}
              </div>

              {/* Footer Controls */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setActiveCallPatient(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  {callState === 'completed' ? 'Close Portal' : 'Cancel Call'}
                </button>
                {callState === 'completed' && (
                  <button
                    onClick={() => {
                      setActiveCallPatient(null);
                      navigate(`/doctor/patient/${activeCallPatient.id}/twin`);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    View Updated Digital Twin →
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
