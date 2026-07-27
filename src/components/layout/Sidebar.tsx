import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Activity,
  FileBarChart,
  Bell,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
  Stethoscope,
  User,
  ShieldCheck,
  ClipboardCheck,
  GitCommitHorizontal,
  HeartHandshake,
  PhoneCall
} from 'lucide-react';
import { useAuthMock } from '../../hooks/useAuthMock';
import { useProfile } from '../../context/ProfileContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role } = useAuthMock();
  const { patientName } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();

  // Doctor Navigation items according to spec
  const doctorNavItems: NavItem[] = [
    { name: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'Patients', path: '/doctor/patients', icon: Users },
    { name: 'Offline Recovery Center', path: '/doctor/offline-recovery', icon: PhoneCall, badge: 'IVR' },
    { name: 'Digital Twin', path: '/doctor/digital-twin', icon: Activity },
    { name: 'Recovery Reports', path: '/doctor/reports', icon: FileBarChart },
    { name: 'Notifications', path: '/doctor/notifications', icon: Bell, badge: '5' },
    { name: 'Appointments', path: '/doctor/appointments', icon: Calendar, badge: '4' },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const patientNavItems: NavItem[] = [
    { name: 'Patient Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
    { name: 'Daily Recovery Update', path: '/patient/update', icon: ClipboardCheck },
    { name: 'Recovery Timeline', path: '/patient/timeline', icon: GitCommitHorizontal },
    { name: 'Full Health Report', path: '/patient/report', icon: FileBarChart },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const guardianNavItems: NavItem[] = [
    { name: 'Guardian Portal', path: '/guardian/dashboard', icon: HeartHandshake },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const activeNav = role === 'doctor' ? doctorNavItems : role === 'guardian' ? guardianNavItems : patientNavItems;

  const roleInfo = {
    patient: {
      name: patientName,
      credential: 'Patient • Post-ACL Surgery',
      icon: User,
      statusColor: 'bg-brand-500',
      statusDot: 'bg-emerald-400',
      hospital: 'AIIMS New Delhi',
    },
    doctor: {
      name: 'Dr. Ananya Roy',
      credential: 'Senior Orthopaedic Surgeon',
      icon: Stethoscope,
      statusColor: 'bg-indigo-500',
      statusDot: 'bg-indigo-400',
      hospital: 'AIIMS New Delhi',
    },
    guardian: {
      name: 'Priya Sharma',
      credential: `Guardian • Caregiver for ${patientName}`,
      icon: ShieldCheck,
      statusColor: 'bg-purple-500',
      statusDot: 'bg-purple-400',
      hospital: 'AIIMS New Delhi',
    },
  };

  const currentRoleInfo = roleInfo[role] || roleInfo.doctor;
  const InfoIcon = currentRoleInfo.icon;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[61px] left-0 z-50 lg:z-30 w-64 h-screen lg:h-[calc(100vh-61px)] bg-white border-r border-slate-200/80 p-4 overflow-y-auto transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Doctor / User Profile Card */}
          <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md shadow-slate-900/10 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${currentRoleInfo.statusColor} text-white shrink-0 relative shadow-sm`}>
                <InfoIcon className="w-5 h-5" />
                <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${currentRoleInfo.statusDot} ring-2 ring-slate-900 animate-pulse`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black tracking-tight truncate">{currentRoleInfo.name}</div>
                <div className="text-[10px] text-slate-300 font-semibold truncate mt-0.5">{currentRoleInfo.credential}</div>
                <div className="text-[9px] text-brand-300 font-extrabold uppercase tracking-wider mt-1 truncate">
                  📍 {currentRoleInfo.hospital}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            <div className="px-3 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              {role === 'doctor' ? 'Clinical Navigation' : role === 'guardian' ? 'Guardian Care' : 'Patient Portal'}
            </div>
            {activeNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/doctor/dashboard' && location.pathname.startsWith(item.path));
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group ${
                      isActive
                        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand-700'}`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-3.5 h-3.5 opacity-50 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer & Logout */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Logout</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50 text-rose-400" />
          </button>

          <div className="text-center pt-2">
            <p className="text-[10px] text-slate-400 font-bold">Sahayak.ai v2.0 • AI Clinical Engine</p>
          </div>
        </div>
      </aside>
    </>
  );
};
