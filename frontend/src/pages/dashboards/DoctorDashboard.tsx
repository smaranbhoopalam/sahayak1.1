import React from 'react';
import { SummaryCard } from '../../components/doctor/SummaryCard';
import { HighRiskPanel } from '../../components/doctor/HighRiskPanel';
import { AiInsightsPanel } from '../../components/doctor/AiInsightsPanel';
import { PatientListTable } from '../../components/doctor/PatientListTable';
import { RecoveryOverviewCharts } from '../../components/doctor/RecoveryOverviewCharts';
import { QuickActionsPanel } from '../../components/doctor/QuickActionsPanel';
import { AppointmentsSection } from '../../components/doctor/AppointmentsSection';
import { RecentActivityTimeline } from '../../components/doctor/RecentActivityTimeline';
import { NotificationsSection } from '../../components/doctor/NotificationsSection';

import { mockPatients } from '../../data/mockPatients';
import { mockStats } from '../../data/mockStats';
import {
  Users,
  AlertTriangle,
  Activity,
  FileCheck,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  Stethoscope
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  // Mapping icons to mockStats
  const statIcons: Record<string, React.ElementType> = {
    Users,
    AlertTriangle,
    Activity,
    FileCheck,
    ShieldCheck,
  };

  const statColors: Record<string, { bg: string; text: string }> = {
    'stat-1': { bg: 'bg-brand-50', text: 'text-brand-600' },
    'stat-2': { bg: 'bg-rose-50', text: 'text-rose-600' },
    'stat-3': { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    'stat-4': { bg: 'bg-amber-50', text: 'text-amber-600' },
    'stat-5': { bg: 'bg-indigo-50', text: 'text-indigo-600' },
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Doctor Dashboard Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 rounded-3xl p-6 lg:p-8 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase tracking-widest flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5" /> Doctor Portal
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Sahayak AI Engine Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Good Morning, Dr. Ananya Roy 👋
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-brand-400" />
                AIIMS New Delhi • Department of Orthopaedics
              </span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-400" />
                {formattedDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-right">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 block">
                Assigned Patients
              </span>
              <span className="text-xl font-black text-white">128 Active</span>
            </div>
            <div className="bg-rose-500/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-rose-500/30 text-right">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 block">
                Critical Flags
              </span>
              <span className="text-xl font-black text-rose-300">3 Requires Care</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {mockStats.map((stat) => {
          const IconComponent = statIcons[stat.iconName] || Users;
          const colors = statColors[stat.id] || { bg: 'bg-brand-50', text: 'text-brand-600' };

          return (
            <SummaryCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              trend={stat.trend}
              trendType={stat.trendType}
              description={stat.description}
              icon={IconComponent}
              iconBgColor={colors.bg}
              iconTextColor={colors.text}
              sparkline={stat.sparkline}
            />
          );
        })}
      </div>

      {/* Quick Actions Panel */}
      <QuickActionsPanel />

      {/* High Risk Section Panel */}
      <HighRiskPanel patients={mockPatients} />

      {/* AI Insights Panel */}
      <AiInsightsPanel />

      {/* Active Patient Roster with Search and Filters */}
      <PatientListTable patients={mockPatients} />

      {/* Recovery Overview Charts */}
      <RecoveryOverviewCharts />

      {/* Consultations & Notifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentsSection />
        <NotificationsSection />
      </div>

      {/* Recent Activity Timeline Feed */}
      <RecentActivityTimeline />
    </div>
  );
};
