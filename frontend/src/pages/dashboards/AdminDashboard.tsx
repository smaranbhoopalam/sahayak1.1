import React from 'react';
import { PageTitle } from '../../components/common/PageTitle';
import { AnalyticsCard } from '../../components/admin/AnalyticsCard';
import { Card } from '../../components/common/Card';
import { mockAdminAnalytics } from '../../data/mockData';
import { Users, AlertTriangle, CheckCircle2, RotateCcw, Stethoscope, ShieldCheck } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <PageTitle
        title="Hospital Admin Analytics"
        subtitle="Sahayak System-wide Patient Recovery & Readmission Monitoring Dashboard"
      />

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Total Patients Enrolled"
          value={mockAdminAnalytics.totalPatients}
          change="+12.4% this month"
          changeType="positive"
          icon={Users}
          iconBg="bg-brand-500 text-white"
        />

        <AnalyticsCard
          title="High Risk Triage"
          value={mockAdminAnalytics.highRiskPatients}
          change="-2 cases vs last week"
          changeType="positive"
          icon={AlertTriangle}
          iconBg="bg-rose-500 text-white"
        />

        <AnalyticsCard
          title="Recovery Success Rate"
          value={`${mockAdminAnalytics.recoverySuccessRate}%`}
          change="+1.8% target exceeded"
          changeType="positive"
          icon={CheckCircle2}
          iconBg="bg-emerald-500 text-white"
        />

        <AnalyticsCard
          title="30-Day Readmission Rate"
          value={`${mockAdminAnalytics.readmissionRate}%`}
          change="Industry Benchmark: 5.4%"
          changeType="positive"
          icon={RotateCcw}
          iconBg="bg-indigo-500 text-white"
        />
      </div>

      {/* Hospital Department Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card bordered header={
          <div className="flex items-center gap-2 text-slate-900">
            <Stethoscope className="w-5 h-5 text-brand-500" />
            <span>Departmental Breakdown</span>
          </div>
        }>
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Orthopedics & Joint Replacement</h4>
                <p className="text-slate-500 mt-0.5">184 Active Patients • 2 High Risk</p>
              </div>
              <span className="font-extrabold text-brand-700 text-sm">96.2% Velocity</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Cardiothoracic Surgery</h4>
                <p className="text-slate-500 mt-0.5">112 Active Patients • 8 High Risk</p>
              </div>
              <span className="font-extrabold text-amber-600 text-sm">88.4% Velocity</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">General Gastrointestinal Surgery</h4>
                <p className="text-slate-500 mt-0.5">122 Active Patients • 4 High Risk</p>
              </div>
              <span className="font-extrabold text-emerald-600 text-sm">94.1% Velocity</span>
            </div>
          </div>
        </Card>

        <Card bordered header={
          <div className="flex items-center gap-2 text-slate-900">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span>Sahayak Infrastructure Health</span>
          </div>
        }>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Active Attending Surgeons:</span>
              <span className="font-bold text-slate-900">32 Specialists Registered</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Daily Patient Log Compliance:</span>
              <span className="font-bold text-emerald-600">92.4% Submissions On-time</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Digital Twin Engine Latency:</span>
              <span className="font-bold text-slate-900">&lt; 42ms Sync</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Automated Risk Triage Alerts:</span>
              <span className="font-bold text-brand-600">Active (Real-Time)</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
