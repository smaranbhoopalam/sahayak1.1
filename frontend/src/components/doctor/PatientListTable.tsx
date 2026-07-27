import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, RefreshCw } from 'lucide-react';
import { DoctorPatient } from '../../data/mockPatients';

interface PatientListTableProps {
  patients: DoctorPatient[];
}

export const PatientListTable: React.FC<PatientListTableProps> = ({ patients }) => {
  const navigate = useNavigate();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [selectedHospital, setSelectedHospital] = useState<string>('All');

  // Filtered Patients Memo
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // Search
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase());

      // Risk
      const matchesRisk =
        selectedRisk === 'All' || patient.riskLevel.toLowerCase() === selectedRisk.toLowerCase();

      // Stage
      const matchesStage =
        selectedStage === 'All' || patient.recoveryStage.toLowerCase() === selectedStage.toLowerCase();

      // Hospital
      const matchesHospital =
        selectedHospital === 'All' || patient.hospital.toLowerCase().includes(selectedHospital.toLowerCase());

      return matchesSearch && matchesRisk && matchesStage && matchesHospital;
    });
  }, [patients, searchTerm, selectedRisk, selectedStage, selectedHospital]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRisk('All');
    setSelectedStage('All');
    setSelectedHospital('All');
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      {/* Table Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            Active Patient Roster
            <span className="px-2 py-0.5 rounded-full text-xs font-black bg-brand-50 text-brand-700 border border-brand-200">
              {filteredPatients.length} Patients
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Real-time biometric scores & digital twin tracking
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient or procedure..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-400 transition-colors"
          />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filters:
          </span>

          {/* Risk Level Filter Dropdown */}
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-400 cursor-pointer"
          >
            <option value="All">All Risks</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Recovery Stage Filter */}
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-400 cursor-pointer"
          >
            <option value="All">All Stages</option>
            <option value="Early Post-Op">Early Post-Op</option>
            <option value="Mid Rehab">Mid Rehab</option>
            <option value="Late Recovery">Late Recovery</option>
            <option value="Pre-Discharge">Pre-Discharge</option>
          </select>

          {/* Hospital Filter */}
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-400 cursor-pointer"
          >
            <option value="All">All Hospitals</option>
            <option value="AIIMS">AIIMS New Delhi</option>
            <option value="Fortis">Fortis Healthcare</option>
            <option value="Max">Max Super Speciality</option>
            <option value="Manipal">Manipal Hospital</option>
          </select>
        </div>

        {(searchTerm || selectedRisk !== 'All' || selectedStage !== 'All' || selectedHospital !== 'All') && (
          <button
            onClick={resetFilters}
            className="text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filters
          </button>
        )}
      </div>

      {/* Patient Cards Table View */}
      <div className="space-y-3">
        {filteredPatients.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
            <p className="text-sm font-bold">No patients match your search criteria.</p>
            <button onClick={resetFilters} className="mt-2 text-xs font-bold text-brand-600 underline">
              Clear filters
            </button>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <motion.div
              key={patient.id}
              whileHover={{ scale: 1.002 }}
              className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Patient Basic Info */}
              <div className="flex items-center gap-3.5 min-w-[240px]">
                <div className={`w-11 h-11 rounded-2xl ${patient.avatarBg || 'bg-brand-500'} text-white font-black text-base flex items-center justify-center shadow-xs shrink-0`}>
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-slate-900 leading-tight">{patient.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      patient.riskLevel === 'critical'
                        ? 'bg-rose-500 text-white'
                        : patient.riskLevel === 'high'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : patient.riskLevel === 'medium'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {patient.riskLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    {patient.id} • {patient.age} yrs • {patient.gender} • <span className="text-slate-700 font-bold">{patient.hospital}</span>
                  </p>
                </div>
              </div>

              {/* Procedure & Stage */}
              <div className="min-w-[200px]">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Procedure & Stage
                </span>
                <p className="text-xs font-bold text-slate-800 truncate">{patient.procedure}</p>
                <p className="text-[11px] text-brand-600 font-bold mt-0.5">
                  Day {patient.recoveryDay} • {patient.recoveryStage}
                </p>
              </div>

              {/* Recovery Confidence & Drift Index */}
              <div className="flex items-center gap-6 min-w-[220px]">
                {/* Confidence */}
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                    <span>Confidence</span>
                    <span className="text-brand-600 font-black">{patient.confidenceScore}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        patient.confidenceScore >= 85
                          ? 'bg-emerald-500'
                          : patient.confidenceScore >= 70
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${patient.confidenceScore}%` }}
                    />
                  </div>
                </div>

                {/* Drift Index */}
                <div className="text-center shrink-0">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Drift Index
                  </span>
                  <span className={`text-sm font-black ${patient.driftIndex > 2.5 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {patient.driftIndex}
                  </span>
                </div>
              </div>

              {/* Quick View Action */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                  className="px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Quick View
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
