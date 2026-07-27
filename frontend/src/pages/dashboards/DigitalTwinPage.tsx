import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  Sparkles, CheckCircle2, FileText, Share2, Printer, Compass, TrendingUp, Maximize2, X,
  Clock, Plus
} from 'lucide-react';
import { mockTwinTimeline, RegionMetrics } from '../../data/mockTwinData';
import { InteractiveBodyTwin } from '../../components/digitalTwin/InteractiveBodyTwin';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

interface ClinicalNote {
  id: string;
  time: string;
  author: string;
  text: string;
}

export const DigitalTwinPage: React.FC = () => {
  const navigate = useNavigate();

  // Timeline Slider state
  const [sliderDay, setSliderDay] = useState<number>(12); // Day 12 is default

  // Find closest mock data point
  const timelineDays = [1, 6, 12, 30];
  const activeDay = useMemo(() => {
    return timelineDays.reduce((prev, curr) =>
      Math.abs(curr - sliderDay) < Math.abs(prev - sliderDay) ? curr : prev
    );
  }, [sliderDay]);

  const activeData = mockTwinTimeline[activeDay];

  // Selected Region state
  const [selectedRegion, setSelectedRegion] = useState<string>('knees');

  // Compare Mode state
  const [compareMode, setCompareMode] = useState<boolean>(false);

  // 3D Fullscreen Modal state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Clinical Notes state
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([
    { id: '1', time: 'Today, 10:15 AM', author: 'Dr. Ananya Roy', text: 'ACL graft exhibits excellent stability. Swelling decreased markedly. Advised to start light quad sets.' },
    { id: '2', time: 'Yesterday, 04:30 PM', author: 'Dr. Ananya Roy', text: 'Checked knee flexion velocity. Progressing steadily at 85 degrees. Pain managed well with PRN NSAIDs.' },
    { id: '3', time: 'Last Week, Monday', author: 'Dr. Ananya Roy', text: 'Sutures removed. Portal sites healing with no signs of erythema or infection.' },
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const note: ClinicalNote = {
      id: Date.now().toString(),
      time: 'Just now',
      author: 'Dr. Ananya Roy',
      text: newNoteText,
    };
    setClinicalNotes([note, ...clinicalNotes]);
    setNewNoteText('');
  };

  // Region metrics lookup
  const currentRegionMetrics: RegionMetrics = activeData.regions[selectedRegion] || {
    pain: 0,
    swelling: 'None',
    temperature: 36.5,
    mobility: 'Normal',
    healingPct: 100,
    rom: 'Full',
    strength: 'Normal',
    medImpact: 'N/A',
    notes: 'Normal status',
    status: 'healthy',
  };

  // Region statuses for InteractiveBodyTwin (Today)
  const regionStatuses = useMemo(() => {
    const statuses: Record<string, 'healthy' | 'healing' | 'attention' | 'critical'> = {};
    Object.entries(activeData.regions).forEach(([key, val]) => {
      statuses[key] = val.status;
    });
    return statuses;
  }, [activeData]);

  // Region statuses for InteractiveBodyTwin (Day 1)
  const day1Statuses = useMemo(() => {
    const statuses: Record<string, 'healthy' | 'healing' | 'attention' | 'critical'> = {};
    Object.entries(mockTwinTimeline[1].regions).forEach(([key, val]) => {
      statuses[key] = val.status;
    });
    return statuses;
  }, []);

  // Vitals array
  const vitals = [
    { label: 'Heart Rate', value: `${activeData.vitals.hr} bpm`, status: 'Normal', color: 'text-rose-500' },
    { label: 'BP Vitals', value: activeData.vitals.bp, status: 'Normal', color: 'text-sky-500' },
    { label: 'Oxygen Saturation', value: `${activeData.vitals.spo2}%`, status: 'Normal', color: 'text-emerald-500' },
    { label: 'Body Temp', value: `${activeData.vitals.temp} °C`, status: 'Normal', color: 'text-amber-500' },
    { label: 'Walking Steps', value: `${activeData.vitals.steps} steps`, status: 'On Target', color: 'text-indigo-500' },
  ];

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* 1. Patient Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Avatar Photo Placeholder */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-emerald-400 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-brand-500/20 shrink-0">
            RS
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-black text-slate-900">Rahul Sharma</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Stable
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              ID: <span className="font-extrabold text-slate-700">PAT-1023</span> • 24 Years • Male • <span className="text-slate-800 font-extrabold">ACL Reconstruction</span>
            </p>
            <p className="text-[11px] text-brand-600 font-extrabold mt-0.5">
              Day {sliderDay} Post-Op • AIIMS New Delhi • Dr. Ananya Roy
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => navigate('/doctor/reports')}
            variant="outline"
            size="sm"
            icon={<FileText className="w-4 h-4" />}
          >
            Generate Report
          </Button>
          <Button
            onClick={() => alert('Clinical File Link Copied!')}
            variant="outline"
            size="sm"
            icon={<Share2 className="w-4 h-4" />}
          >
            Share
          </Button>
          <Button
            onClick={() => window.print()}
            variant="outline"
            size="sm"
            icon={<Printer className="w-4 h-4" />}
          >
            Print
          </Button>
        </div>
      </div>

      {/* 2. Recovery Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Confidence Score */}
        <Card bordered className="bg-white p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
              Confidence Score
            </span>
            <span className="text-2xl font-black text-slate-900 block">{activeData.confidenceScore}%</span>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +4.2% Expected
            </span>
          </div>
          {/* Progress Circle Visual */}
          <div className="w-14 h-14 relative shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brand-500"
                strokeWidth="3.5"
                strokeDasharray={`${activeData.confidenceScore}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </Card>

        {/* Card 2: Drift Index */}
        <Card bordered className="bg-white p-5 space-y-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                Drift Index
              </span>
              <span className="text-2xl font-black text-slate-900 block">{activeData.driftIndex}</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
              activeData.driftIndex > 2.5
                ? 'bg-rose-100 text-rose-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {activeData.driftIndex > 2.5 ? 'Alert' : 'Optimal'}
            </span>
          </div>
          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                activeData.driftIndex > 2.5 ? 'bg-rose-500' : 'bg-brand-500'
              }`}
              style={{ width: `${Math.min((activeData.driftIndex / 5) * 100, 100)}%` }}
            />
          </div>
        </Card>

        {/* Card 3: Medication Adherence */}
        <Card bordered className="bg-white p-5 space-y-2">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
              Medication Adherence
            </span>
            <span className="text-2xl font-black text-slate-900 block">{activeData.medAdherence}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${activeData.medAdherence}%` }}
            />
          </div>
        </Card>

        {/* Card 4: Stage */}
        <Card bordered className="bg-white p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
              Recovery Stage
            </span>
            <span className="text-sm font-black text-slate-800 block truncate">{activeData.stage}</span>
            <span className="text-[10px] text-slate-400 font-bold">Phase 2 Clinical Goal</span>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
            <Compass className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* 3. Main Workspace: compare mode or normal 3D */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Left 70% Workspace */}
        <div className="flex-1 flex flex-col justify-between bg-slate-900 rounded-3xl p-6 border border-slate-800 relative">
          {/* Header info */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-4 z-10">
            <div>
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                🤖 Sahayak Digital Twin™
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  Live Sensor Sync
                </span>
              </h2>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                Targeted ACL bio-telemetry reconstruction workspace
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                  compareMode
                    ? 'bg-brand-500 border-brand-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                {compareMode ? 'Exit Compare' : 'Compare Day 1 vs Today'}
              </button>
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-750"
                title="Expand Digital Twin"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Model Views */}
          {compareMode ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black text-rose-400 block bg-rose-500/10 border border-rose-500/20 py-1 rounded-lg">
                  Day 1 (Initial Post-Op)
                </span>
                <InteractiveBodyTwin
                  selectedRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                  regionStatuses={day1Statuses}
                  compareMode
                  dayValue={1}
                />
              </div>
              <div className="text-center space-y-2">
                <span className="text-xs font-black text-emerald-400 block bg-emerald-500/10 border border-emerald-500/20 py-1 rounded-lg">
                  Day {sliderDay} (Today)
                </span>
                <InteractiveBodyTwin
                  selectedRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                  regionStatuses={regionStatuses}
                  compareMode
                  dayValue={sliderDay}
                />
              </div>
            </div>
          ) : (
            <InteractiveBodyTwin
              selectedRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
              regionStatuses={regionStatuses}
            />
          )}

          {/* Timeline Slider below Twin */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-extrabold">Active Recovery Timeline</span>
              <span className="text-brand-400 font-black bg-brand-500/10 px-2 py-0.5 rounded-md border border-brand-500/20">
                Day {sliderDay} of 30
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={sliderDay}
              onChange={(e) => setSliderDay(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-extrabold">
              <span>Day 1 (Acute)</span>
              <span>Day 6 (Mobility)</span>
              <span>Day 12 (Rehab)</span>
              <span>Day 30 (Milestone)</span>
            </div>
          </div>
        </div>

        {/* Right Analysis Panel */}
        <div className="w-full lg:w-[360px] bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Selected Region</span>
                <h3 className="text-base font-black text-slate-900 capitalize">{selectedRegion}</h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                currentRegionMetrics.status === 'critical'
                  ? 'bg-rose-500 text-white animate-pulse'
                  : currentRegionMetrics.status === 'attention'
                  ? 'bg-amber-100 text-amber-800'
                  : currentRegionMetrics.status === 'healing'
                  ? 'bg-sky-100 text-sky-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {currentRegionMetrics.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 text-xs font-semibold">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Pain level</span>
                <span className="text-sm font-black text-slate-800">{currentRegionMetrics.pain}/10</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Swelling</span>
                <span className="text-sm font-black text-slate-800">{currentRegionMetrics.swelling}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Temperature</span>
                <span className="text-sm font-black text-slate-800">{currentRegionMetrics.temperature} °C</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Mobility</span>
                <span className="text-sm font-black text-slate-800">{currentRegionMetrics.mobility}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Healing %</span>
                <span className="text-sm font-black text-slate-800">{currentRegionMetrics.healingPct}%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Range of Motion</span>
                <span className="text-sm font-black text-slate-800">{currentRegionMetrics.rom}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] text-slate-400 block">Clinician observation notes</span>
              <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                {currentRegionMetrics.notes}
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 font-semibold space-y-1">
            <span className="text-[10px] text-slate-400 block">Recovery Prediction</span>
            <p className="leading-snug">Expected full load bearing within next <strong>18 days</strong>.</p>
          </div>
        </div>
      </div>

      {/* 4. Vitals & Recovery Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vitals */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100">Patient Vitals</h3>
          <div className="space-y-3">
            {vitals.map((vit, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                <span className="text-xs font-bold text-slate-500">{vit.label}</span>
                <div className="text-right">
                  <span className={`text-xs font-black block ${vit.color}`}>{vit.value}</span>
                  <span className="text-[9px] text-slate-400 font-bold block">{vit.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recovery Insights */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-600" /> AI Insights Card
            </h3>
            <div className="p-3 bg-brand-50/50 rounded-xl border border-brand-200/60 text-xs text-brand-900 font-semibold">
              <p className="font-extrabold">{activeData.aiInsight.summary}</p>
              <p className="text-[11px] text-brand-800 mt-1">{activeData.aiInsight.details}</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Metrics Improvement</span>
              {activeData.aiInsight.positives.map((pos, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{pos}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-bold pt-2 border-t border-slate-100">
            Explainability verified with biomechanical controls
          </div>
        </div>

        {/* Recovery Prediction */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100">Recovery Prediction</h3>
            <div className="grid grid-cols-2 gap-4 py-4 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-brand-600">96%</span>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block mt-1">Est. Recovery</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-slate-800">18 Days</span>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase block mt-1">Expected Full</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600">
            <strong>Confidence Interval:</strong> High (verified ROM)
          </div>
        </div>
      </div>

      {/* 5. Clinical Notes Timeline Section */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100">Physician Clinical Observations Log</h3>

        {/* Enter new note */}
        <form onSubmit={handleAddNote} className="space-y-3">
          <textarea
            rows={2}
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-brand-400 resize-none font-semibold"
            placeholder="Add new clinical observation note to patient chart..."
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Note
            </Button>
          </div>
        </form>

        {/* Notes list */}
        <div className="space-y-4 pt-2">
          {clinicalNotes.map((note) => (
            <div key={note.id} className="p-4 bg-slate-50 rounded-xl border border-slate-150 text-xs space-y-1 relative">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-extrabold">
                <span>{note.author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {note.time}</span>
              </div>
              <p className="text-slate-800 font-semibold leading-relaxed pt-1">
                {note.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen 3D Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-slate-950 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-white text-base font-black flex items-center gap-2">
                  🤖 Fullscreen Twin Workspace
                </h2>
                <p className="text-xs text-slate-400">Interactive SVG body projection workspace</p>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <InteractiveBodyTwin
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
                regionStatuses={regionStatuses}
              />
            </div>

            <div className="border-t border-slate-800 pt-4 text-center text-xs text-slate-500">
              Double click on regions to select. Fullscreen prototype mode active.
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
