import React, { useState } from 'react';
import { Star, MapPin, Globe, Check, Stethoscope, Key } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  languages: string[];
  availability: string;
  doctorCode: string;
}

const DOCTORS_DATABASE: Doctor[] = [
  {
    id: "1",
    name: "Dr. Amanda Carter",
    specialization: "Cardiothoracic Surgery & Post-Op",
    hospital: "City Heart & Surgical Institute",
    rating: 4.9,
    reviewsCount: 142,
    distanceKm: 3.2,
    languages: ["English", "Hindi"],
    availability: "Available Today",
    doctorCode: "SH-992"
  },
  {
    id: "2",
    name: "Dr. Vikram Sethi",
    specialization: "Orthopedic Surgery & Joint Rehabilitation",
    hospital: "Apex Super Speciality Hospital",
    rating: 4.8,
    reviewsCount: 98,
    distanceKm: 5.8,
    languages: ["Hindi", "Punjabi", "English"],
    availability: "Available Tomorrow",
    doctorCode: "SH-410"
  },
  {
    id: "3",
    name: "Dr. Priya Nair",
    specialization: "Obstetrics & Post-Caesarean Recovery",
    hospital: "Lotus Women's Health Clinic",
    rating: 5.0,
    reviewsCount: 210,
    distanceKm: 2.1,
    languages: ["English", "Malayalam", "Tamil"],
    availability: "Available Today",
    doctorCode: "SH-788"
  }
];

export const DoctorDiscovery: React.FC = () => {
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [connectedDoctor, setConnectedDoctor] = useState<Doctor | null>(null);

  const handleCodeConnect = (e: React.FormEvent) => {
    e.preventDefault();
    const found = DOCTORS_DATABASE.find(d => d.doctorCode.toLowerCase() === enteredCode.trim().toLowerCase());
    if (found) {
      setConnectedDoctor(found);
    } else if (enteredCode.trim() !== '') {
      setConnectedDoctor({
        id: "custom",
        name: "Dr. Ananya Sharma",
        specialization: "General Post-Discharge Recovery",
        hospital: "Sahayak Remote Care Network",
        rating: 4.9,
        reviewsCount: 88,
        distanceKm: 4.0,
        languages: ["English", "Hindi"],
        availability: "Connected Live",
        doctorCode: enteredCode.toUpperCase()
      });
    }
  };

  return (
    <section id="doctor-discovery" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            Connected Healthcare Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Smart Doctor Discovery & Instant Binding
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Patients can discover verified specialists by distance, languages, and ratings, or instantly link using a unique <strong>Doctor Code</strong>.
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto glass-panel p-6 rounded-3xl border border-teal-200 bg-white glow-teal shadow-md space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
            <Key className="w-4 h-4 text-teal-600" />
            Have a Doctor Code from your discharge sheet?
          </div>

          <form onSubmit={handleCodeConnect} className="flex gap-2">
            <input 
              type="text" 
              placeholder="e.g. SH-992" 
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-teal-500 font-mono text-center uppercase tracking-widest placeholder:text-slate-400 shadow-2xs"
            />
            <button 
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-2xl text-xs transition duration-200 shadow-sm"
            >
              Connect Twin
            </button>
          </form>

          {connectedDoctor && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-left space-y-1 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <Check className="w-4 h-4 text-emerald-600" /> Connected Successfully!
              </div>
              <p className="text-sm font-bold text-slate-900">{connectedDoctor.name}</p>
              <p className="text-xs text-slate-600">{connectedDoctor.specialization} • {connectedDoctor.hospital}</p>
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCTORS_DATABASE.map((doc) => (
            <div key={doc.id} className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-5 text-left flex flex-col justify-between hover:border-slate-300 transition">
              
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-teal-700 text-sm">
                    {doc.name.split(' ')[1]?.[0] || 'DR'}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 font-mono">
                    CODE: {doc.doctorCode}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">{doc.name}</h3>
                  <p className="text-xs text-teal-700 font-semibold">{doc.specialization}</p>
                  <p className="text-xs text-slate-500 mt-1">{doc.hospital}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{doc.rating}</span>
                    <span className="text-slate-400 font-normal">({doc.reviewsCount})</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{doc.distanceKm} km away</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{doc.languages.join(', ')}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setEnteredCode(doc.doctorCode);
                  setConnectedDoctor(doc);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition shadow-2xs"
              >
                Connect via Code ({doc.doctorCode})
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
