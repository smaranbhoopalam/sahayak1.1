import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../components/common/PageTitle';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { RecoveryScoreCard } from '../../components/patient/RecoveryScoreCard';
import { DailyUpdateCard } from '../../components/patient/DailyUpdateCard';
import { DigitalTwinPreview } from '../../components/digitalTwin/DigitalTwinPreview';
import { TimelinePreview } from '../../components/timeline/TimelinePreview';
import { NotificationCard } from '../../components/common/NotificationCard';
import { mockCurrentPatient, mockNotifications } from '../../data/mockData';
import { useProfile } from '../../context/ProfileContext';
import {
  ClipboardCheck,
  GitCommitHorizontal,
  FileBarChart,
  Target,
  CheckCircle2,
  Bell
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { patientName } = useProfile();

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header with Main Navigation Action Buttons */}
      <PageTitle
        title={`Welcome back, ${patientName}`}
        subtitle={`Day ${mockCurrentPatient.recoveryDay} Post-Op • ${mockCurrentPatient.condition} • Dr. ${mockCurrentPatient.assignedDoctorName}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => navigate('/patient/update')}
              variant="primary"
              size="sm"
              icon={<ClipboardCheck className="w-4 h-4" />}
            >
              Update Recovery
            </Button>
            <Button
              onClick={() => navigate('/patient/timeline')}
              variant="outline"
              size="sm"
              icon={<GitCommitHorizontal className="w-4 h-4" />}
            >
              Open Timeline
            </Button>
            <Button
              onClick={() => navigate('/patient/report')}
              variant="secondary"
              size="sm"
              icon={<FileBarChart className="w-4 h-4" />}
            >
              View Report
            </Button>
          </div>
        }
      />

      {/* Daily Update Prompt Banner */}
      <DailyUpdateCard completedToday={false} />

      {/* Recovery Scores Overview */}
      <RecoveryScoreCard
        confidenceScore={mockCurrentPatient.confidenceScore}
        driftIndex={mockCurrentPatient.driftIndex}
        lastUpdated={mockCurrentPatient.lastUpdated}
      />

      {/* Main Grid: Digital Twin + Today's Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Digital Twin Preview (Takes 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <DigitalTwinPreview
            patientName={patientName}
            condition={mockCurrentPatient.condition}
          />
          <TimelinePreview />
        </div>

        {/* Right Sidebar: Today's Goals & Notifications */}
        <div className="space-y-6">
          {/* Today's Goals Placeholder Card */}
          <Card bordered header={
            <div className="flex items-center gap-2 text-slate-900">
              <Target className="w-5 h-5 text-brand-500" />
              <span>Today's Recovery Goals</span>
            </div>
          }>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Morning Quadriceps Sets</h4>
                  <p className="text-[11px] text-slate-500">3 sets x 15 reps (Completed)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Walk Target: 3,500 Steps</h4>
                  <p className="text-[11px] text-slate-500">2,410 steps completed so far</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Evening Ice Compression</h4>
                  <p className="text-[11px] text-slate-500">20 mins post-exercise</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications Card */}
          <Card bordered header={
            <div className="flex items-center justify-between text-slate-900 w-full">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                <span>Recent Alerts</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                2 New
              </span>
            </div>
          }>
            <div className="space-y-3">
              {mockNotifications.map((notif) => (
                <NotificationCard key={notif.id} notification={notif} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
