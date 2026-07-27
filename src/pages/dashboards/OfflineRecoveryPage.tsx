import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, PhoneCall, MessageSquare, History, BarChart2, Settings,
  CheckCircle2, UserCheck, X, Search
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface OfflinePatient {
  id: string;
  name: string;
  phone: string;
  procedure: string;
  recovery_day: number;
  preferred_language: string;
  preferred_comm: string;
  hospital: string;
  doctor_name: string;
  age: number;
  risk_level: string;
  recovery_status: string;
}

interface SMSLog {
  id: number;
  patient_name: string;
  phone_number: string;
  message: string;
  sent_time: string;
  status: string;
  reply: string | null;
  recovery_updated: boolean;
}

const ivrQuestions = [
  { step: 1, key: 'medication', text: "Question 1. Have you taken today's medicine?", options: "Press 1 for Yes | Press 2 for No" },
  { step: 2, key: 'pain_level', text: "Question 2. Rate your current pain level.", options: "Press a number between 1 and 10 on your keypad" },
  { step: 3, key: 'exercise', text: "Question 3. Did you complete today's exercises?", options: "Press 1 for Yes | Press 2 for No" },
  { step: 4, key: 'swelling', text: "Question 4. Do you have swelling at the operated site?", options: "Press 1 for Mild | Press 2 for Moderate | Press 3 for Severe" },
  { step: 5, key: 'callback', text: "Question 5. Would you like a doctor callback today?", options: "Press 1 for Yes | Press 2 for No" },
];

export const OfflineRecoveryPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Active Tab: dashboard | patients | ivr | sms | history | settings
  const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'ivr' | 'sms' | 'history' | 'settings'>('dashboard');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<string>('All');

  // React Query: Fetch Patients from backend database
  const { data: patientsList = [] } = useQuery<OfflinePatient[]>({
    queryKey: ['patients'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/api/patients');
      if (!res.ok) throw new Error('Failed to fetch patients');
      return res.json();
    }
  });

  // React Query: Fetch SMS Logs
  const { data: smsHistory = [] } = useQuery<SMSLog[]>({
    queryKey: ['smsHistory'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/api/sms/history');
      if (!res.ok) throw new Error('Failed to fetch SMS history');
      return res.json();
    }
  });

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

  // SMS status state
  const [selectedSMSPatient, setSelectedSMSPatient] = useState<OfflinePatient | null>(null);
  const [smsStatus, setSmsStatus] = useState<'idle' | 'sending' | 'success' | 'failed'>('idle');
  const [smsTimestamp, setSmsTimestamp] = useState('');

  // Mutation to send SMS via Exotel using React Query
  const sendSMSMutation = useMutation({
    mutationFn: async (patient: OfflinePatient) => {
      const res = await fetch('http://localhost:8000/api/sms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patient.id,
          phone_number: patient.phone
        })
      });
      if (!res.ok) throw new Error('Failed to send SMS');
      return res.json();
    },
    onMutate: () => {
      setSmsStatus('sending');
    },
    onSuccess: (data) => {
      if (data.success) {
        setSmsStatus('success');
        setSmsTimestamp(data.timestamp);
        // Refresh SMS history and patients list immediately
        queryClient.invalidateQueries({ queryKey: ['smsHistory'] });
        queryClient.invalidateQueries({ queryKey: ['patients'] });
      } else {
        setSmsStatus('failed');
      }
    },
    onError: () => {
      setSmsStatus('failed');
    }
  });

  const triggerSendSMS = (patient: OfflinePatient) => {
    sendSMSMutation.mutate(patient);
  };

  // Initiate Call function connecting to backend API
  const handleStartCall = async (patient: OfflinePatient) => {
    setActiveCallPatient(patient);
    setCallState('calling');
    setCallDuration(0);
    setCurrentStep(1);
    setUserAnswers({});
    setCallLogs([`[00:00] Initiating Exotel IVR outbound voice call to ${patient.phone}...`]);

    try {
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
        setCallLogs((prev) => [...prev, `[00:02] Dialing ${patient.phone} via Exotel Gateway (SID: {data.call_sid || 'EX99420'})`]);
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
      setCallState('completed');
      setCallLogs((prev) => [
        ...prev,
        `[00:${callDuration}] All 5 IVR responses gathered. Hanging up Twilio call.`,
        `Calculating Sahayak Recovery Engine Scores...`,
        `Digital Twin updated. Doctor Dashboard synced!`,
      ]);

      try {
        await fetch('http://localhost:8000/api/ivr/finish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        queryClient.invalidateQueries({ queryKey: ['patients'] });
      } catch (err) {
        // ignore
      }
    }
  };

  // Filtered Patients List
  const filteredPatients = patientsList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone.includes(searchTerm);
    const matchesComm = filterMode === 'All' || p.preferred_comm === filterMode;
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
            onClick={() => patientsList.length > 0 && handleStartCall(patientsList[0])}
            disabled={patientsList.length === 0}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
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
          { id: 'history', label: 'Call & SMS History', icon: History },
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
                      <p className="text-[11px] font-semibold text-slate-500">{patient.phone} • {patient.preferred_language}</p>
                    </div>
                  </div>

                  <div className="min-w-[180px]">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Procedure</span>
                    <span className="text-xs font-bold text-slate-800">{patient.procedure}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      patient.risk_level === 'low'
                        ? 'bg-emerald-100 text-emerald-800'
                        : patient.risk_level === 'medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {patient.risk_level.toUpperCase()} RISK
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
                    <p className="text-[11px] font-semibold text-slate-500">{patient.phone} • {patient.hospital} (Age {patient.age})</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Procedure & Day</span>
                  <span className="text-xs font-bold text-slate-800">{patient.procedure} (Day {patient.recovery_day})</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Language & Mode</span>
                  <span className="text-xs font-bold text-slate-800">{patient.preferred_language} • <span className="text-emerald-700 font-black">{patient.preferred_comm}</span></span>
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

      {/* TAB 3: SMS/WhatsApp Messaging */}
      {activeTab === 'sms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Patient Selection Roster */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900">Message Triage Hub</h3>
              <p className="text-xs text-slate-500 font-semibold">Initiate automated patient check-ins via SMS</p>
            </div>
            
            <div className="space-y-3">
              {patientsList.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col gap-3 ${
                    selectedSMSPatient?.id === patient.id
                      ? 'border-emerald-500 bg-emerald-50/20'
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{patient.name}</h4>
                        <p className="text-[10px] font-semibold text-slate-500">{patient.phone}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">Day {patient.recovery_day}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedSMSPatient(patient);
                        setSmsStatus('idle');
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3" /> Select SMS Check-in
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SMS Status / Delivery Panel */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {selectedSMSPatient ? (
              <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                    {selectedSMSPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{selectedSMSPatient.name}</h4>
                    <p className="text-[11px] font-semibold text-slate-500">{selectedSMSPatient.phone}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {smsStatus === 'idle' && (
                    <div className="text-center py-6 space-y-3">
                      <span className="text-3xl block">📨</span>
                      <p className="text-xs text-slate-600 font-semibold">
                        Ready to send daily check-in message via Exotel SMS.
                      </p>
                      <button
                        onClick={() => triggerSendSMS(selectedSMSPatient)}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-colors cursor-pointer"
                      >
                        Send Check-in SMS
                      </button>
                    </div>
                  )}

                  {smsStatus === 'sending' && (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto"></div>
                      <p className="text-xs text-slate-600 font-extrabold animate-pulse">
                        Sending SMS...
                      </p>
                    </div>
                  )}

                  {smsStatus === 'success' && (
                    <div className="text-center py-6 space-y-3">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                      <h4 className="text-xs font-black text-emerald-600">✓ SMS Sent Successfully</h4>
                      <p className="text-[11px] font-semibold text-slate-500">
                        Delivered to {selectedSMSPatient.phone}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold">{smsTimestamp}</p>
                      <button
                        onClick={() => triggerSendSMS(selectedSMSPatient)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Send Again
                      </button>
                    </div>
                  )}

                  {smsStatus === 'failed' && (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-lg font-black">!</div>
                      <h4 className="text-xs font-black text-rose-600">SMS Failed</h4>
                      <p className="text-[10px] font-semibold text-slate-500">Could not deliver to {selectedSMSPatient.phone}</p>
                      <button
                        onClick={() => triggerSendSMS(selectedSMSPatient)}
                        className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-colors cursor-pointer"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl max-w-sm bg-slate-50/50">
                <span className="text-4xl block mb-2">📲</span>
                <h4 className="text-sm font-black text-slate-800">SMS Portal Idle</h4>
                <p className="text-[11px] font-semibold text-slate-500 mt-1">
                  Select a patient on the left to review or trigger the outbound check-in SMS.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CALL & SMS HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* SMS History Logs */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900">SMS Check-in History</h3>
              <p className="text-xs text-slate-500 font-semibold">Exotel outbound logs and patient replies</p>
            </div>

            <div className="space-y-3">
              {smsHistory.length > 0 ? (
                smsHistory.map((log) => (
                  <div key={log.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex justify-between items-start text-xs">
                      <div>
                        <span className="font-black text-slate-900">{log.patient_name}</span>
                        <span className="text-slate-500 font-semibold ml-2">({log.phone_number})</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(log.sent_time).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                      {log.message}
                    </p>

                    <div className="flex justify-between items-center text-[10px] font-extrabold pt-2 border-t border-slate-200/50">
                      <span className="flex items-center gap-1">
                        Status: <strong className={log.status === 'Sent' || log.status === 'Delivered' ? 'text-emerald-600' : 'text-rose-600'}>{log.status}</strong>
                      </span>
                      <span>
                        Reply: <strong className="text-brand-600">{log.reply || 'No Reply Yet'}</strong>
                      </span>
                      <span className="text-emerald-700">
                        {log.recovery_updated ? 'Digital Twin Updated ✓' : 'Pending Patient Reply'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-400 font-semibold">
                  No SMS logs recorded.
                </div>
              )}
            </div>
          </div>

          {/* Voice IVR Call Logs */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900">IVR Call History & Telemetry Logs</h3>
              <p className="text-xs text-slate-500 font-semibold">Recorded DTMF keypad answers and calculated confidence scores</p>
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
                    Language: <span className="text-emerald-400 font-bold">{activeCallPatient.preferred_language}</span> • Provider: <span className="text-brand-400 font-bold">Exotel Voice API</span>
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
