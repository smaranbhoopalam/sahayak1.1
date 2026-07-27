import React, { useState } from 'react';
import { PageTitle } from '../components/common/PageTitle';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Bell, Shield, User, CheckCircle2 } from 'lucide-react';
import { useAuthMock } from '../hooks/useAuthMock';
import { UserRole } from '../types';

export const SettingsPage: React.FC = () => {
  const { role, changeRole } = useAuthMock();
  const [saved, setSaved] = useState(false);

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <PageTitle
        title="Settings & System Configuration"
        subtitle="Manage your profile preferences, notifications, and portal role view."
      />

      <Card bordered className="bg-white p-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Active Role Configuration */}
          <div className="space-y-2 pb-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-brand-500" /> Active View Role (Mock Mode)
            </h3>
            <p className="text-xs text-slate-500">
              Switch the active portal role to test patient, doctor, or administrator views.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {(['patient', 'doctor', 'guardian'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => changeRole(r)}
                  className={`p-3 rounded-xl border text-xs font-bold capitalize transition-all ${
                    role === r
                      ? 'bg-brand-500 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r} Portal
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Placeholder */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" /> Alert & Reminder Preferences
            </h3>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <h4 className="text-xs font-bold text-slate-800">Daily Recovery Questionnaire Reminder</h4>
                <p className="text-[11px] text-slate-500">Receive morning notification at 9:00 AM</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 accent-brand-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <h4 className="text-xs font-bold text-slate-800">Doctor Note & Milestone Email Digest</h4>
                <p className="text-[11px] text-slate-500">Receive weekly summary reports</p>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="w-4 h-4 accent-brand-500 cursor-pointer"
              />
            </div>
          </div>

          {/* System Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" /> Platform Info
            </h3>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 text-slate-600">
              <p><strong>Environment:</strong> Hackathon Mock Mode (Frontend Only)</p>
              <p><strong>Framework:</strong> React + Vite + TypeScript + Tailwind CSS</p>
              <p><strong>Version:</strong> Sahayak v1.0.0-foundation</p>
            </div>
          </div>

          {saved && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Settings updated successfully!
            </div>
          )}

          <Button type="submit" variant="primary" size="md">
            Save Preferences
          </Button>
        </form>
      </Card>
    </div>
  );
};
