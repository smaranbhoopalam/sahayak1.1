import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../components/common/PageTitle';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockCurrentPatient, mockDailyUpdates } from '../../data/mockData';
import { useProfile } from '../../context/ProfileContext';
import { ChevronLeft, Printer, Download, Calendar } from 'lucide-react';

export const PatientReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { patientName } = useProfile();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      <button
        onClick={() => navigate('/patient/dashboard')}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 print:hidden"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <PageTitle
        title="Comprehensive Post-Op Health Report"
        subtitle={`Generated for ${patientName} • Clinical Ref: ${mockCurrentPatient.id}`}
        actions={
          <div className="flex items-center gap-2 print:hidden">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              icon={<Printer className="w-4 h-4" />}
            >
              Print Summary
            </Button>
            <Button
              onClick={() => alert('Mock PDF Report Download Triggered')}
              variant="primary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
            >
              Download PDF
            </Button>
          </div>
        }
      />

      {/* Patient Clinical Header Card */}
      <Card bordered className="bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">{patientName}</h2>
              <StatusBadge status={mockCurrentPatient.riskLevel} />
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {mockCurrentPatient.age} yrs • {mockCurrentPatient.gender} • Surgery Date: {mockCurrentPatient.surgeryDate}
            </p>
            <p className="text-xs font-semibold text-brand-700 mt-0.5">
              Primary Condition: {mockCurrentPatient.condition}
            </p>
          </div>

          <div className="flex items-center gap-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block">Attending Surgeon</span>
              <span className="font-bold text-slate-900 text-sm">{mockCurrentPatient.assignedDoctorName}</span>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <span className="text-slate-400 block">Hospital</span>
              <span className="font-bold text-slate-900 text-sm">{mockCurrentPatient.hospital}</span>
            </div>
          </div>
        </div>

        {/* Clinical Key Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500">Recovery Velocity Score</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{mockCurrentPatient.confidenceScore}%</div>
            <span className="text-[11px] text-emerald-600 font-medium">Optimal Range</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500">Recovery Drift Index</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{mockCurrentPatient.driftIndex}</div>
            <span className="text-[11px] text-slate-400">Target &lt; 1.5</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500">Meds Adherence Rate</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">100%</div>
            <span className="text-[11px] text-slate-400">12 Days Logged</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500">Mobility Step Avg</span>
            <div className="text-2xl font-extrabold text-brand-600 mt-1">2,850</div>
            <span className="text-[11px] text-slate-400">Steps / Day</span>
          </div>
        </div>
      </Card>

      {/* Log History */}
      <Card bordered header={
        <div className="flex items-center gap-2 text-slate-900">
          <Calendar className="w-5 h-5 text-brand-500" />
          <span>Recent Daily Log History</span>
        </div>
      }>
        <div className="divide-y divide-slate-100">
          {mockDailyUpdates.map((update) => (
            <div key={update.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 text-sm">{update.date}</span>
                <p className="text-slate-500 mt-0.5">{update.notes}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0 font-medium text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <span>Pain: <strong className="text-slate-900">{update.painLevel}/10</strong></span>
                <span>Temp: <strong className="text-slate-900">{update.temperature}°C</strong></span>
                <span>Steps: <strong className="text-brand-600">{update.walkingSteps}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
