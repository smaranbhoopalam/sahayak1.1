import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Activity, ShieldCheck, HeartPulse, UserCheck, Stethoscope, ChevronRight, Sparkles } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-61px)] bg-gradient-to-b from-slate-900 via-slate-900 to-brand-950 text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Container */}
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center relative z-10 my-auto">
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-400/30 text-brand-300 text-xs font-semibold mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Sahayak Healthcare Hackathon Project</span>
        </div>

        {/* Project Name & Tagline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
          Sahayak<span className="text-brand-400">.ai</span>
        </h1>
        <p className="text-xl sm:text-2xl font-light text-slate-300 max-w-3xl mx-auto mb-4">
          Intelligent Post-Operative Recovery & Digital Twin Monitoring
        </p>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Closing the care gap between hospital discharge and full recovery with daily risk drift tracking, patient milestone timelines, and continuous clinical oversight.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Button
            onClick={() => navigate('/login')}
            variant="primary"
            size="lg"
            fullWidth
            className="bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold shadow-lg shadow-brand-500/25"
            icon={<ChevronRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Login to Dashboard
          </Button>

          <Button
            onClick={() => navigate('/register/patient')}
            variant="outline"
            size="lg"
            fullWidth
            className="border-slate-700 bg-slate-800/60 text-white hover:bg-slate-800 hover:border-slate-600"
            icon={<UserCheck className="w-5 h-5 text-brand-400" />}
          >
            Register as Patient
          </Button>

          <Button
            onClick={() => navigate('/register/doctor')}
            variant="outline"
            size="lg"
            fullWidth
            className="border-slate-700 bg-slate-800/60 text-white hover:bg-slate-800 hover:border-slate-600"
            icon={<Stethoscope className="w-5 h-5 text-accent-400" />}
          >
            Register as Doctor
          </Button>
        </div>

        {/* Highlights feature strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-slate-800/80 text-left">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800/80">
            <HeartPulse className="w-6 h-6 text-brand-400 mb-2" />
            <h3 className="text-sm font-bold text-white">Digital Twin Model</h3>
            <p className="text-xs text-slate-400 mt-1">Simulates joint mobility & tissue thermal recovery index.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800/80">
            <Activity className="w-6 h-6 text-emerald-400 mb-2" />
            <h3 className="text-sm font-bold text-white">Recovery Drift Alert</h3>
            <p className="text-xs text-slate-400 mt-1">Early warning indicators for post-op complications.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800/80">
            <ShieldCheck className="w-6 h-6 text-amber-400 mb-2" />
            <h3 className="text-sm font-bold text-white">Clinician Dashboard</h3>
            <p className="text-xs text-slate-400 mt-1">Real-time patient triage & risk score prioritization.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 border-t border-slate-800/60 text-center text-xs text-slate-500 relative z-10">
        Sahayak Healthcare System • Built for Hackathon Demo • All interactions use mock workflows.
      </div>
    </div>
  );
};
