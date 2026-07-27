import React, { useState } from 'react';
import { Target, Plus, Check, X } from 'lucide-react';

interface RecoveryGoalsStepProps {
  data: {
    goals: string[];
    customGoals: string[];
  };
  onChange: (updated: Partial<RecoveryGoalsStepProps['data']>) => void;
}

const PRESET_GOALS = [
  { id: 'pain', label: 'Reduce daily pain levels', icon: '⚡' },
  { id: 'walk', label: 'Walk independently without aids', icon: '🚶‍♂️' },
  { id: 'work', label: 'Return to normal work schedule', icon: '💼' },
  { id: 'exercise', label: 'Resume active exercise/sport', icon: '💪' },
  { id: 'sleep', label: 'Restore restful sleep patterns', icon: '💤' },
];

export const RecoveryGoalsStep: React.FC<RecoveryGoalsStepProps> = ({ data, onChange }) => {
  const [newGoal, setNewGoal] = useState('');

  const togglePresetGoal = (goalLabel: string) => {
    if (data.goals.includes(goalLabel)) {
      onChange({ goals: data.goals.filter(g => g !== goalLabel) });
    } else {
      onChange({ goals: [...data.goals, goalLabel] });
    }
  };

  const addCustomGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    if (!data.customGoals.includes(newGoal.trim())) {
      onChange({ customGoals: [...data.customGoals, newGoal.trim()] });
    }
    setNewGoal('');
  };

  const removeCustomGoal = (goal: string) => {
    onChange({ customGoals: data.customGoals.filter(g => g !== goal) });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-400 text-left font-sans">
      
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">Select Your Recovery Goals</h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          We will align your AI health tips and exercises to help you achieve these milestones safely.
        </p>
      </div>

      {/* Goal Presets */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          1. What are your main targets for this recovery phase?
        </label>
        
        <div className="grid grid-cols-1 gap-2.5">
          {PRESET_GOALS.map((preset) => {
            const isSelected = data.goals.includes(preset.label);
            return (
              <button
                key={preset.id}
                onClick={() => togglePresetGoal(preset.label)}
                type="button"
                className={`p-4 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                  isSelected 
                    ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl select-none">{preset.icon}</span>
                  <span className="text-xs sm:text-sm font-bold">{preset.label}</span>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  isSelected 
                    ? 'bg-teal-605 border-teal-600 text-white' 
                    : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Goals */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          2. Add custom goals
        </label>
        <p className="text-[11px] text-slate-505 font-medium">
          Enter any personal milestones (e.g., "Climb 3 flights of stairs", "Play with grandchildren")
        </p>

        <form onSubmit={addCustomGoal} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <Target className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              placeholder="e.g. Climb stairs without catching my breath..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-205 focus:border-teal-500/60 text-sm text-slate-800 focus:outline-none"
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

        {/* Custom goal tags */}
        {data.customGoals.length > 0 && (
          <div className="flex flex-col gap-2 pt-2">
            {data.customGoals.map((goal) => (
              <div
                key={goal}
                className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-202 text-xs text-slate-700 font-semibold shadow-2xs animate-in fade-in duration-200"
              >
                <div className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>{goal}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeCustomGoal(goal)}
                  className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
