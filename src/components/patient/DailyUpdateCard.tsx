import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ClipboardList, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DailyUpdateCardProps {
  completedToday?: boolean;
}

export const DailyUpdateCard: React.FC<DailyUpdateCardProps> = ({ completedToday = false }) => {
  const navigate = useNavigate();

  return (
    <Card bordered className="bg-gradient-to-r from-brand-900 to-slate-900 text-white shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-brand-300 border border-white/10 shrink-0">
            {completedToday ? <CheckCircle2 className="w-7 h-7 text-emerald-400" /> : <ClipboardList className="w-7 h-7 text-brand-300" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Daily Recovery Questionnaire</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30">
                {completedToday ? 'Logged' : 'Pending'}
              </span>
            </div>
            <p className="text-sm text-slate-300 mt-1 max-w-lg">
              {completedToday
                ? "You have recorded today's pain score, temperature, and medication compliance."
                : "Help your doctor track recovery velocity by logging today's pain, medication, and walking progress."}
            </p>
          </div>
        </div>

        <Button
          onClick={() => navigate('/patient/update')}
          variant="primary"
          className="bg-white text-slate-900 hover:bg-brand-50 hover:text-brand-900 font-bold shrink-0"
          icon={<ChevronRight className="w-4 h-4" />}
          iconPosition="right"
        >
          {completedToday ? 'Edit Log' : 'Update Recovery'}
        </Button>
      </div>
    </Card>
  );
};
