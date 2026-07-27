import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { RecoveryRoadmapPath } from '../../components/common/RecoveryRoadmapPath';
import { FloatingHashtagBadges } from '../../components/common/FloatingHashtagBadges';
import { SahayakDnaLogo } from '../../components/common/SahayakDnaLogo';
import { Mail, Lock, LogIn, Chrome, UserPlus, Stethoscope } from 'lucide-react';
import { useAuthMock } from '../../hooks/useAuthMock';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { changeRole } = useAuthMock();
  const { t } = useLanguage();

  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    changeRole(selectedRole);

    if (selectedRole === 'patient') {
      navigate('/patient/dashboard');
    } else if (selectedRole === 'doctor') {
      navigate('/doctor/dashboard');
    } else if (selectedRole === 'guardian') {
      navigate('/guardian/dashboard');
    }
  };

  const handleForgotPassword = () => {
    alert('Mock: Password reset instructions have been sent to your email.');
  };

  const handleGoogleLogin = () => {
    changeRole(selectedRole);
    if (selectedRole === 'patient') navigate('/patient/dashboard');
    else if (selectedRole === 'doctor') navigate('/doctor/dashboard');
    else navigate('/guardian/dashboard');
  };

  const getRoleLabel = (role: UserRole) => {
    if (role === 'patient') return t.patient;
    if (role === 'doctor') return t.doctor;
    return t.guardian;
  };

  return (
    <div className="min-h-[calc(100vh-61px)] flex items-center justify-center p-4 relative overflow-hidden py-10 bg-[url('/medical_cross_bg.png')] bg-cover bg-center bg-no-repeat selection:bg-brand-500 selection:text-white">
      {/* Background Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/30 via-white/20 to-blue-100/30 backdrop-blur-xs pointer-events-none z-0" />

      {/* Winding Recovery Roadmap Path (Offset beside the road) */}
      <RecoveryRoadmapPath />

      {/* Random Floating Hashtags (#HealthyLife #FitAndStrong) */}
      <FloatingHashtagBadges />

      {/* Centered Liquid Glass Theme Login Card */}
      <div className="w-full max-w-md mx-auto relative z-20 space-y-4 my-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-sky-200 text-brand-700 text-sm font-black shadow-lg backdrop-blur-md">
            <SahayakDnaLogo size={28} />
            <span>SAHAYAK MEDICAL PORTAL</span>
          </div>
        </div>

        {/* Liquid-Glass Card Container */}
        <Card
          bordered={false}
          className="bg-white/40 backdrop-blur-2xl border border-white/80 shadow-2xl shadow-sky-900/10 p-6 sm:p-8 rounded-3xl text-slate-800 relative overflow-hidden"
        >
          {/* Liquid Gloss Shine Gradient Overlay */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-gradient-to-br from-white/60 via-white/20 to-transparent rounded-full blur-xl pointer-events-none" />

          {/* Subtitle moved inside card so road elements don't overlap it */}
          <p className="text-center text-sm text-slate-600 font-semibold mb-4 relative z-10">{t.subtitle}</p>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            {/* Role Selection Tabs */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                {t.selectRole}
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl">
                {(['patient', 'doctor', 'guardian'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      selectedRole === r
                        ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 font-extrabold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {getRoleLabel(r)}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <Input
              label={t.emailAddress}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4 text-slate-400" />}
              className="bg-white/60 backdrop-blur-md border-white/80 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 rounded-xl"
              required
            />

            {/* Password Field */}
            <Input
              label={t.password}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4 text-slate-400" />}
              className="bg-white/60 backdrop-blur-md border-white/80 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 rounded-xl"
              required
            />

            {/* Forgot Password Link */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-bold text-brand-700 hover:text-brand-800 hover:underline"
              >
                {t.forgotPassword}
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              className="mt-2 py-3 bg-brand-500 hover:bg-brand-600 text-white font-black shadow-xl shadow-brand-500/30 rounded-xl"
              icon={<LogIn className="w-4 h-4" />}
            >
              {t.loginAs} {getRoleLabel(selectedRole).toUpperCase()}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 relative flex items-center justify-center relative z-10">
            <div className="border-t border-slate-300/60 w-full" />
            <span className="bg-white/80 backdrop-blur-md px-3 text-xs text-slate-500 absolute font-bold rounded-full">
              {t.or}
            </span>
          </div>

          {/* Google Login Button */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="secondary"
            fullWidth
            className="bg-white/70 backdrop-blur-md border-white/80 text-slate-800 hover:bg-white/90 rounded-xl"
            icon={<Chrome className="w-4 h-4 text-rose-500" />}
          >
            {t.continueWithGoogle}
          </Button>

          {/* Register Links */}
          <div className="mt-6 pt-4 border-t border-slate-200/60 space-y-2 text-center relative z-10">
            <p className="text-xs font-semibold text-slate-600">{t.needAccount}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Button
                type="button"
                onClick={() => navigate('/register/patient')}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto text-xs bg-white/70 border-white/80 text-slate-800 hover:bg-white/90 rounded-xl"
                icon={<UserPlus className="w-3.5 h-3.5 text-brand-600" />}
              >
                {t.registerAsPatient}
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/register/doctor')}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto text-xs bg-white/70 border-white/80 text-slate-800 hover:bg-white/90 rounded-xl"
                icon={<Stethoscope className="w-3.5 h-3.5 text-accent-600" />}
              >
                {t.registerAsDoctor}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
