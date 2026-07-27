import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DigitalTwinPreview } from '../../components/digitalTwin/DigitalTwinPreview';
import { TimelineView } from '../../components/timeline/TimelineView';
import { RecoveryScoreCard } from '../../components/patient/RecoveryScoreCard';
import { mockDoctorPatients } from '../../data/mockData';
import { mockPatients, DoctorPatient } from '../../data/mockPatients';
import { ChevronLeft, Pill, Send, CheckCircle2, Phone, Mail, Sparkles } from 'lucide-react';

export const DoctorPatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find patient from mockPatients or mockDoctorPatients
  const foundMock: DoctorPatient | undefined = mockPatients.find((p) => p.id === id);
  const foundLegacy = mockDoctorPatients.find((p) => p.id === id);

  const patient = foundMock
    ? {
        id: foundMock.id,
        name: foundMock.name,
        age: foundMock.age,
        gender: foundMock.gender,
        condition: foundMock.procedure,
        confidenceScore: foundMock.confidenceScore,
        driftIndex: foundMock.driftIndex,
        riskLevel: foundMock.riskLevel,
        hospital: foundMock.hospital,
        phone: foundMock.phone,
        email: foundMock.email,
        assignedDoctorName: foundMock.assignedDoctor,
        recoveryDay: foundMock.recoveryDay,
        lastUpdated: foundMock.lastCheckin,
        aiAlert: foundMock.aiAlert,
      }
    : foundLegacy
    ? {
        ...foundLegacy,
        aiAlert: undefined,
      }
    : {
        id: 'PAT-101',
        name: 'Rahul Sharma',
        age: 42,
        gender: 'Male',
        condition: 'Post-ACL Reconstruction Surgery',
        confidenceScore: 92,
        driftIndex: 0.8,
        riskLevel: 'low' as const,
        hospital: 'AIIMS New Delhi',
        phone: '+91 98765 43210',
        email: 'rahul.sharma@example.com',
        assignedDoctorName: 'Dr. Ananya Roy',
        recoveryDay: 12,
        lastUpdated: '10 mins ago',
        aiAlert: 'Optimal mobility velocity logged.',
      };

  const [doctorNotes, setDoctorNotes] = useState(
    `Patient ${patient.name} is progressing well. Range of motion has reached target velocity. Continue daily quadriceps exercises & digital twin tracking.`
  );
  const [noteSaved, setNoteSaved] = useState(false);

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/doctor/dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Doctor Dashboard
      </button>

      {/* Patient Clinical Profile Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white font-black text-xl flex items-center justify-center shadow-md shadow-brand-500/20 shrink-0">
              {patient.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-black text-slate-900">{patient.name}</h1>
                <StatusBadge status={patient.riskLevel} size="md" />
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Ref: <span className="font-extrabold text-slate-700">{patient.id}</span> • {patient.age} yrs • {patient.gender} • Day {patient.recoveryDay} Post-Op
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <a
              href={`tel:${patient.phone}`}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-brand-600" />
              {patient.phone}
            </a>
            <a
              href={`mailto:${patient.email}`}
              className="px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold transition-colors inline-flex items-center gap-1.5 border border-brand-200"
            >
              <Mail className="w-3.5 h-3.5" />
              Email Patient
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Procedure</span>
            <span className="font-black text-slate-900">{patient.condition}</span>
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Attending Hospital</span>
            <span className="font-black text-slate-900">📍 {patient.hospital}</span>
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Assigned Surgeon</span>
            <span className="font-black text-slate-900">🩺 {patient.assignedDoctorName}</span>
          </div>
        </div>

        {patient.aiAlert && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
            <span><strong>Sahayak AI Alert:</strong> {patient.aiAlert}</span>
          </div>
        )}
      </div>

      {/* 1. Recovery Scores Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
          1. Clinical Recovery Biometrics
        </h3>
        <RecoveryScoreCard
          confidenceScore={patient.confidenceScore}
          driftIndex={patient.driftIndex}
          lastUpdated={patient.lastUpdated}
        />
      </div>

      {/* 2. Digital Twin Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
          2. Anatomical 3D Digital Twin Model
        </h3>
        <DigitalTwinPreview
          patientName={patient.name}
          condition={patient.condition}
        />
      </div>

      {/* 3. Timeline & Medication Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline (Takes 2 Columns) */}
        <div className="lg:col-span-2 space-y-2">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            3. Post-Op Milestone Timeline
          </h3>
          <TimelineView />
        </div>

        {/* Medication & Doctor Notes */}
        <div className="space-y-6">
          {/* Medication Card */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              4. Active Medications
            </h3>
            <Card bordered className="bg-white">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <Pill className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Paracetamol 500mg</h4>
                    <p className="text-[11px] text-slate-500">1 tablet twice daily post meals (Pain Relief)</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <Pill className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Cefuroxime Axetil 250mg</h4>
                    <p className="text-[11px] text-slate-500">1 tablet after breakfast (Antibiotic Course)</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Doctor Notes & Care Plan Update */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              5. Physician Clinical Observations
            </h3>
            <Card bordered className="bg-white">
              <form onSubmit={handleSaveNotes} className="space-y-3">
                <textarea
                  rows={4}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-brand-400 resize-none font-semibold"
                  placeholder="Enter physician clinical observations..."
                />

                <div className="flex items-center justify-between">
                  {noteSaved ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" /> Clinical notes saved to chart!
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Recorded by Dr. Ananya Roy</span>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Save to Chart
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
