import React from 'react';
import { Card } from '../common/Card';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { User, Calendar, Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../../types';

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const navigate = useNavigate();

  return (
    <Card hoverable className="border border-slate-100 flex flex-col justify-between h-full">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">{patient.name}</h3>
              <p className="text-xs text-slate-500">{patient.age} yrs • {patient.gender}</p>
            </div>
          </div>
          <StatusBadge status={patient.riskLevel} />
        </div>

        {/* Condition & Details */}
        <div className="bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100 space-y-1.5">
          <div className="text-xs font-medium text-slate-800 line-clamp-1">
            <span className="text-slate-400">Condition:</span> {patient.condition}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Day {patient.recoveryDay} Post-Op
            </span>
            <span className="flex items-center gap-1 font-semibold text-brand-700">
              <Activity className="w-3.5 h-3.5" />
              Score: {patient.confidenceScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">ID: {patient.id}</span>
        <Button
          onClick={() => navigate(`/doctor/patient/${patient.id}`)}
          variant="outline"
          size="sm"
          icon={<ChevronRight className="w-3.5 h-3.5" />}
          iconPosition="right"
        >
          Open Patient
        </Button>
      </div>
    </Card>
  );
};
