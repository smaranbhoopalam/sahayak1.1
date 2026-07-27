import React, { useState } from 'react';
import { Pill, Plus, X } from 'lucide-react';

interface HealthInfoStepProps {
  data: {
    conditions: string[];
    allergies: string[];
    medications: string[];
  };
  onChange: (updated: Partial<HealthInfoStepProps['data']>) => void;
}

const COMMON_CONDITIONS = ['Hypertension', 'Diabetes (Type 1/2)', 'Asthma', 'Heart Disease', 'None of these'];
const COMMON_ALLERGIES = ['Penicillin', 'Sulfa Drugs', 'Latex', 'Aspirin', 'None'];

export const HealthInfoStep: React.FC<HealthInfoStepProps> = ({ data, onChange }) => {
  const [newMed, setNewMed] = useState('');

  const toggleCondition = (cond: string) => {
    if (cond === 'None of these') {
      onChange({ conditions: ['None of these'] });
      return;
    }
    const current = data.conditions.filter(c => c !== 'None of these');
    if (current.includes(cond)) {
      onChange({ conditions: current.filter(c => c !== cond) });
    } else {
      onChange({ conditions: [...current, cond] });
    }
  };

  const toggleAllergy = (allergy: string) => {
    if (allergy === 'None') {
      onChange({ allergies: ['None'] });
      return;
    }
    const current = data.allergies.filter(a => a !== 'None');
    if (current.includes(allergy)) {
      onChange({ allergies: current.filter(a => a !== allergy) });
    } else {
      onChange({ allergies: [...current, allergy] });
    }
  };

  const addMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.trim()) return;
    if (!data.medications.includes(newMed.trim())) {
      onChange({ medications: [...data.medications, newMed.trim()] });
    }
    setNewMed('');
  };

  const removeMedication = (med: string) => {
    onChange({ medications: data.medications.filter(m => m !== med) });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-400 text-left font-sans">
      
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">Your Health Overview</h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          This info prevents dangerous medication cross-interactions and builds a safer recovery guide.
        </p>
      </div>

      {/* Conditions */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          1. Pre-existing Medical Conditions
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_CONDITIONS.map((cond) => {
            const isSelected = data.conditions.includes(cond);
            return (
              <button
                key={cond}
                onClick={() => toggleCondition(cond)}
                type="button"
                className={`px-4 py-2 rounded-full border text-xs font-bold transition cursor-pointer ${
                  isSelected 
                    ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-2xs' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350 shadow-3xs'
                }`}
              >
                {cond}
              </button>
            );
          })}
        </div>
      </div>

      {/* Allergies */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          2. Known Allergies
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_ALLERGIES.map((allergy) => {
            const isSelected = data.allergies.includes(allergy);
            return (
              <button
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                type="button"
                className={`px-4 py-2 rounded-full border text-xs font-bold transition cursor-pointer ${
                  isSelected 
                    ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-2xs' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350 shadow-3xs'
                }`}
              >
                {allergy}
              </button>
            );
          })}
        </div>
      </div>

      {/* Medications */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          3. Current Post-Discharge Medications
        </label>
        <p className="text-[11px] text-slate-500 font-medium">
          Enter any prescribed medicines you are currently taking (e.g. Metoprolol, Aspirin, Painkillers)
        </p>

        {/* Input */}
        <form onSubmit={addMedication} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <Pill className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="e.g. Paracetamol 500mg, Metformin..."
              value={newMed}
              onChange={(e) => setNewMed(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 focus:border-teal-500/60 text-sm text-slate-800 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </form>

        {/* List of active meds */}
        {data.medications.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {data.medications.map((med) => (
              <span
                key={med}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 font-semibold"
              >
                <span>{med}</span>
                <button
                  type="button"
                  onClick={() => removeMedication(med)}
                  className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
