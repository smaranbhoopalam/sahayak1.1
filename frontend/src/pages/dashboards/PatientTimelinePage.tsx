import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../components/common/PageTitle';
import { Button } from '../../components/common/Button';
import { TimelineView } from '../../components/timeline/TimelineView';
import { ChevronLeft, FileBarChart } from 'lucide-react';

export const PatientTimelinePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-12">
      <button
        onClick={() => navigate('/patient/dashboard')}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Patient Dashboard
      </button>

      <PageTitle
        title="Post-Operative Recovery Timeline"
        subtitle="Track your daily milestone progress, clinical check-ins, and mobility targets step-by-step."
        actions={
          <Button
            onClick={() => navigate('/patient/report')}
            variant="outline"
            size="sm"
            icon={<FileBarChart className="w-4 h-4" />}
          >
            Export Health Report
          </Button>
        }
      />

      <TimelineView />
    </div>
  );
};
