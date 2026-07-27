import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ChevronLeft, ChevronRight, CheckCircle2, Calendar, Activity } from 'lucide-react';
import { mockTimelineItems } from '../../data/mockData';

export const TimelineView: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(3); // Default to current day (index 3, Day 12)

  const currentItem = mockTimelineItems[selectedIndex];

  const handlePrev = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex < mockTimelineItems.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft">
        <div>
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
            Interactive Timeline Stepper
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            Day {currentItem.dayNumber}: {currentItem.title}
          </h2>
        </div>

        {/* Previous Day & Next Day Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            variant="secondary"
            size="sm"
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous Day
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedIndex === mockTimelineItems.length - 1}
            variant="secondary"
            size="sm"
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Next Day
          </Button>
        </div>
      </div>

      {/* Horizontal Timeline Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft overflow-x-auto">
        <div className="min-w-[600px] relative py-4">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-200 -translate-y-1/2 rounded-full" />
          
          <div className="relative flex items-center justify-between">
            {mockTimelineItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isDone = item.status === 'completed';
              const isCurrent = item.status === 'current';

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`flex flex-col items-center group focus:outline-none transition-all ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                      isSelected
                        ? 'bg-brand-500 text-white border-brand-600 ring-4 ring-brand-500/20'
                        : isDone
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : isCurrent
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-white text-slate-400 border-slate-300'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span>D{item.dayNumber}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold mt-2.5 max-w-[100px] text-center truncate ${
                      isSelected ? 'text-brand-700 font-bold' : 'text-slate-600'
                    }`}
                  >
                    Day {item.dayNumber}
                  </span>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Day Details Panel */}
      <Card bordered className="bg-white">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  currentItem.status === 'completed'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : currentItem.status === 'current'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {currentItem.status} Milestone
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Date: {currentItem.date}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">{currentItem.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{currentItem.description}</p>

            {currentItem.vitalSummary && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-xs text-slate-700">
                <Activity className="w-4 h-4 text-brand-500 shrink-0" />
                <span><strong>Recorded Vitals:</strong> {currentItem.vitalSummary}</span>
              </div>
            )}
          </div>

          <div className="w-full md:w-64 p-4 rounded-xl bg-brand-50/40 border border-brand-100/60 space-y-3 shrink-0">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Day Status Highlights
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-brand-100/60 text-slate-600">
                <span>Pain Level Log:</span>
                <span className="font-bold text-slate-900">{currentItem.painLevel ? `${currentItem.painLevel}/10` : 'Pending'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-100/60 text-slate-600">
                <span>Meds Compliance:</span>
                <span className="font-bold text-emerald-600">
                  {currentItem.medicationAdherence ? '100% Adherent' : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span>Doctor Review:</span>
                <span className="font-bold text-brand-700">Validated</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
