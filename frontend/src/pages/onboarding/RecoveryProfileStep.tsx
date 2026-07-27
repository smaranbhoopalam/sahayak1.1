import React, { useState } from 'react';
import { Calendar, Search } from 'lucide-react';

interface RecoveryProfileStepProps {
  data: {
    procedure: string;
    dischargeDate: string;
    bodyArea: string;
  };
  onChange: (updated: Partial<RecoveryProfileStepProps['data']>) => void;
}

const COMMON_PROCEDURES = [
  { id: 'bypass', label: 'Cardiac Bypass Surgery', category: 'Cardiology' },
  { id: 'knee', label: 'Knee Replacement', category: 'Orthopedics' },
  { id: 'Alzheimer', label: "Alzheimer's Disease", category: 'Neurology' },
  { id: 'hernia', label: 'Hernia Repair', category: 'General' },
  { id: 'pcos', label: 'PCOD/PCOS', category: 'Gynecology' },
  { id: 'ceasrean', label: 'Cesarean Delivery', category: 'Gynecology' },
];

const BODY_AREAS = [
  { id: 'chest', label: 'Chest / Heart Area', icon: '🫁' },
  { id: 'abdomen', label: 'Abdomen / Stomach', icon: '🩹' },
  { id: 'legs', label: 'Legs / Knee / Hip', icon: '🦵' },
  { id: 'arms', label: 'Arms / Shoulder / Hand', icon: '💪' },
  { id: 'head', label: 'Head / Neck', icon: '🧠' },
  { id: 'other', label: 'Other Body Area', icon: '👤' },
];

export const RecoveryProfileStep: React.FC<RecoveryProfileStepProps> = ({ data, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-400 text-left font-sans">
      
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">Let's set up your profile</h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          This helps the AI calibrate vital normal ranges for your recovery type.
        </p>
      </div>

      {/* Surgery / Procedure */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          1. What condition or medical procedure did you undergo?
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {COMMON_PROCEDURES.map((proc) => {
            const isSelected = data.procedure === proc.label;
            return (
              <button
                key={proc.id}
                onClick={() => {
                  onChange({ procedure: proc.label });
                  setSearchQuery('');
                }}
                type="button"
                className={`p-3.5 rounded-xl border text-left transition duration-200 cursor-pointer ${
                  isSelected 
                    ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{proc.category}</div>
                <div className="text-sm font-bold mt-0.5">{proc.label}</div>
              </button>
            );
          })}
        </div>

        {/* Custom Input */}
        <div className="relative pt-2">
          <div className="absolute inset-y-0 left-3 top-2 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 mt-2" />
          </div>
          <input
            type="text"
            placeholder="Type other procedure name..."
            value={searchQuery || (COMMON_PROCEDURES.some(p => p.label === data.procedure) ? '' : data.procedure)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onChange({ procedure: e.target.value });
            }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-500/60 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500/60"
          />
        </div>
      </div>

      {/* Discharge Date */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          2. When were you discharged from the hospital?
        </label>
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
            <Calendar className="w-4.5 h-4.5" />
          </div>
          <input
            type="date"
            value={data.dischargeDate}
            onChange={(e) => onChange({ dischargeDate: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-500/60 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500/60 cursor-pointer"
          />
        </div>
      </div>

      {/* Affected Body Area */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          3. Which region of your body is recovery centered around?
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {BODY_AREAS.map((area) => {
            const isSelected = data.bodyArea === area.label;
            return (
              <button
                key={area.id}
                onClick={() => onChange({ bodyArea: area.label })}
                type="button"
                className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition duration-200 cursor-pointer ${
                  isSelected 
                    ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-xs'
                }`}
              >
                <span className="text-2xl mb-1 select-none">{area.icon}</span>
                <span className="text-xs font-bold">{area.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
