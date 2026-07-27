import React from 'react';
import logo from "@/assets/logo.png";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Sahayak Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold font-heading text-slate-900 tracking-tight">Sahayak</span>
            </div>

            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              AI-Powered Post-Discharge Recovery Platform built around a Living Digital Twin. Bridging the visibility gap between hospital release and full patient healing.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Living Digital Twin Network Active</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider">Product Story</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#digital-twin" className="hover:text-teal-700 transition">Living Digital Twin</a></li>
              <li><a href="#timeline" className="hover:text-teal-700 transition">Recovery Timeline</a></li>
              <li><a href="#doctor-sync" className="hover:text-teal-700 transition">Doctor Sync</a></li>
              <li><a href="#intelligence" className="hover:text-teal-700 transition">Explainable AI</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider">Inclusivity & Access</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#rural-asha" className="hover:text-teal-700 transition">Offline SMS & IVR Support</a></li>
              <li><a href="#rural-asha" className="hover:text-teal-700 transition">ASHA Worker Dispatch</a></li>
              <li><a href="#doctor-discovery" className="hover:text-teal-700 transition">Unique Doctor Codes</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sahayak Healthcare Technologies. All rights reserved.</p>
          <p className="text-[11px] text-slate-500">Designed for continuous, proactive post-discharge patient care.</p>
        </div>

      </div>
    </footer>
  );
};
