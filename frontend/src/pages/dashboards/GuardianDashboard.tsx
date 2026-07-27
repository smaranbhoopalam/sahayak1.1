import React from 'react';
import { PageTitle } from '../../components/common/PageTitle';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RecoveryScoreCard } from '../../components/patient/RecoveryScoreCard';
import { DigitalTwinPreview } from '../../components/digitalTwin/DigitalTwinPreview';
import { TimelinePreview } from '../../components/timeline/TimelinePreview';
import { mockCurrentPatient } from '../../data/mockData';
import { useProfile } from '../../context/ProfileContext';
import { HeartHandshake, PhoneCall, Pill, CheckCircle2, AlertCircle } from 'lucide-react';

export const GuardianDashboard: React.FC = () => {
  const { patientName } = useProfile();
  return (
    <div className="space-y-6 pb-12">
      <PageTitle
        title={`Guardian Portal • Monitoring ${patientName}`}
        subtitle={`Relation: Primary Family Guardian • Day ${mockCurrentPatient.recoveryDay} Post-Op • ${mockCurrentPatient.condition}`}
        actions={
          <Button
            onClick={() => alert('Mock Emergency Call to Doctor / Helpline triggered')}
            variant="danger"
            size="sm"
            icon={<PhoneCall className="w-4 h-4" />}
          >
            Emergency Care Line
          </Button>
        }
      />

      {/* Patient Health Overview Card */}
      <Card bordered className="bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-brand-50 text-brand-600">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{patientName}</h2>
                <StatusBadge status={mockCurrentPatient.riskLevel} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Hospital: {mockCurrentPatient.hospital} • Attending: {mockCurrentPatient.assignedDoctorName}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Today's Daily Recovery Log Complete</span>
          </div>
        </div>
      </Card>

      {/* Recovery Scores */}
      <RecoveryScoreCard
        confidenceScore={mockCurrentPatient.confidenceScore}
        driftIndex={mockCurrentPatient.driftIndex}
        lastUpdated={mockCurrentPatient.lastUpdated}
      />

      {/* Digital Twin + Guardian Care Assistance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DigitalTwinPreview
            patientName={patientName}
            condition={mockCurrentPatient.condition}
          />
          <TimelinePreview />
        </div>

        {/* Guardian Checklist & Meds Reminder */}
        <div className="space-y-6">
          <Card bordered header={
            <div className="flex items-center gap-2 text-slate-900">
              <Pill className="w-5 h-5 text-brand-500" />
              <span>Guardian Medication Checklist</span>
            </div>
          }>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Morning Dose (8:00 AM)</h4>
                  <p className="text-slate-500">Paracetamol 500mg + Anti-inflammatory</p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">Given</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Night Dose (8:00 PM)</h4>
                  <p className="text-slate-500">Cefuroxime Axetil 250mg</p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold">Pending</span>
              </div>
            </div>
          </Card>

          <Card bordered header={
            <div className="flex items-center gap-2 text-slate-900">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span>Doctor Guidance for Family</span>
            </div>
          }>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dr. Ananya Roy noted: Ensure patient keeps knee elevated during rest. Cold compression ice pack recommended twice daily for 20 mins.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
