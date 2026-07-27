import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../components/common/PageTitle';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ClipboardCheck, Thermometer, Footprints, Pill, FileText, CheckCircle2, ChevronLeft } from 'lucide-react';

export const DailyUpdatePage: React.FC = () => {
  const navigate = useNavigate();

  const [painLevel, setPainLevel] = useState<number>(3);
  const [medicationTaken, setMedicationTaken] = useState<boolean>(true);
  const [temperature, setTemperature] = useState<string>('36.8');
  const [walkingSteps, setWalkingSteps] = useState<string>('3450');
  const [notes, setNotes] = useState<string>('Discomfort has reduced. Range of motion feels smoother after morning stretches.');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/patient/dashboard');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <button
        onClick={() => navigate('/patient/dashboard')}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Patient Dashboard
      </button>

      <PageTitle
        title="Daily Recovery Questionnaire"
        subtitle="Log your day 12 recovery metrics to sync with Dr. Ananya Roy and Sahayak Digital Twin."
      />

      {submitted ? (
        <Card bordered className="bg-emerald-50 border-emerald-200 text-center py-12 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
          <h3 className="text-xl font-bold text-emerald-900">Daily Log Submitted Successfully!</h3>
          <p className="text-xs text-emerald-700 max-w-sm mx-auto">
            Your metrics have been integrated into your recovery trajectory. Navigating to dashboard...
          </p>
        </Card>
      ) : (
        <Card bordered className="bg-white shadow-soft p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pain Score Slider / Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-800">
                  Current Pain Level (1 = Low, 10 = Severe)
                </label>
                <span className="text-base font-extrabold px-3 py-1 rounded-lg bg-brand-50 text-brand-700 border border-brand-200">
                  {painLevel} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1 - Minimal Pain</span>
                <span>5 - Moderate</span>
                <span>10 - Severe Pain</span>
              </div>
            </div>

            {/* Medication Taken Checkbox */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-500 text-white">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Prescribed Medication Taken</h4>
                  <p className="text-xs text-slate-500">Analgesic & anti-inflammatory dose</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={medicationTaken}
                  onChange={(e) => setMedicationTaken(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
              </label>
            </div>

            {/* Temperature & Walking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Body Temperature (°C)"
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                icon={<Thermometer className="w-4 h-4 text-rose-500" />}
                required
              />
              <Input
                label="Walking Activity (Daily Steps)"
                type="number"
                value={walkingSteps}
                onChange={(e) => setWalkingSteps(e.target.value)}
                icon={<Footprints className="w-4 h-4 text-emerald-500" />}
                required
              />
            </div>

            {/* Notes Textarea */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" /> Additional Notes for Care Team
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe any swelling, mobility discomfort, or physical therapy progress..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                icon={<ClipboardCheck className="w-5 h-5" />}
              >
                Submit Daily Update
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
