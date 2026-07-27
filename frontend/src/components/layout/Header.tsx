import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Settings, Menu, X, LogOut, Globe } from 'lucide-react';
import { SahayakDnaLogo } from '../common/SahayakDnaLogo';
import { ProfilePanel } from '../common/ProfilePanel';
import { useLanguage } from '../../context/LanguageContext';
import { useProfile } from '../../context/ProfileContext';
import { Language } from '../../utils/translations';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

import { useAuth } from '../../context/AuthContext';

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { displayName } = useProfile();
  const { logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const isAuthPage = ['/', '/login', '/register/patient', '/register/doctor'].includes(location.pathname);
  const isLoginPage = location.pathname === '/login';
  const isOnboardingPage = location.pathname === '/onboarding';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 pt-2.5 pb-1 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div
          className="max-w-7xl mx-auto rounded-full bg-white/65 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.12),0_0_20px_-4px_rgba(20,184,166,0.14)] pointer-events-auto relative overflow-hidden transition-all duration-300"
          style={{
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.45)',
          }}
        >
          {/* Soft Specular Reflection Ray (Top Edge) */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          {/* Faint Ambient Teal Edge Glow */}
          <div className="absolute -inset-px rounded-full bg-gradient-to-r from-teal-400/10 via-cyan-400/10 to-emerald-400/10 -z-10 blur-sm pointer-events-none" />

          <div className="px-4 py-1.5 flex items-center justify-between gap-4">
            {/* Left Section: Brand & Sidebar Toggle */}
            <div className="flex items-center gap-3">
              {!isAuthPage && location.pathname !== '/onboarding' && (
                <button
                  onClick={onToggleSidebar}
                  className="lg:hidden p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                  aria-label="Toggle Sidebar"
                >
                  {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}

              <div
                onClick={() => navigate('/')}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <SahayakDnaLogo size={32} />
                <div>
                  <span className="text-lg font-extrabold tracking-tight text-slate-900">
                    Sahayak
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section: Multilingual Selector & Controls */}
            <div className="flex items-center gap-3">
              {/* 3 Multilingual Options Dropdown (English, Hindi, Kannada) */}
              <div className="flex items-center gap-2 bg-slate-100/90 px-3 py-1.5 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-xs hover:border-brand-300 transition-all">
                <Globe className="w-4 h-4 text-brand-600 shrink-0" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer pr-1"
                  aria-label="Select Language"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                </select>
              </div>

              {!isAuthPage && (
                <>
                  {/* Notification Button */}
                  {!isOnboardingPage && (
                    <button
                      onClick={() => navigate('/patient/dashboard')}
                      className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                      title="Notifications"
                    >
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                    </button>
                  )}

                  {/* Settings Button */}
                  {!isOnboardingPage && (
                    <button
                      onClick={() => navigate('/settings')}
                      className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors hidden sm:block"
                      title="Settings"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                  )}

                  {/* User Avatar & Logout Button */}
                  <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                    {!isOnboardingPage && (
                      <button
                        onClick={() => setProfileOpen(true)}
                        title="View Profile"
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-400 border-2 border-brand-200 flex items-center justify-center text-white font-black text-xs cursor-pointer hover:ring-2 hover:ring-brand-500 hover:scale-110 transition-all shadow-md shadow-brand-500/20"
                      >
                        {displayName.charAt(0).toUpperCase()}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        navigate('/login');
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Logout / Change Account"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}

              {isAuthPage && !isLoginPage && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-colors shadow-xs"
                  >
                    {t.signIn}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Slide-in Panel */}
      <ProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
};
