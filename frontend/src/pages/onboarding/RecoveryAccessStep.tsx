import React, { useState } from 'react';
import { Smartphone, Phone, HelpCircle, Wifi, Globe, Clock, Search, ChevronDown, Check } from 'lucide-react';

interface RecoveryAccessStepProps {
  data: {
    deviceType: string;
    internetAvailability: string;
    communicationMode: string;
    preferredLanguage: string;
    preferredContactTime: string;
  };
  onChange: (updated: Partial<RecoveryAccessStepProps['data']>) => void;
}

const LANGUAGES = [
  'English',
  'Hindi (हिन्दी)',
  'Marathi (मराठी)',
  'Tamil (தமிழ்)',
  'Telugu (తెలుగు)',
  'Kannada (ಕನ್ನಡ)',
  'Malayalam (മലയാളം)',
  'Gujarati (ગુજરાતી)',
  'Bengali (বাংলা)',
  'Punjabi (ਪੰਜਾਬੀ)',
  'Odia (ଓଡ଼ିଆ)',
  'Assamese (অসমীয়া)'
];

const DEVICE_OPTIONS = [
  { id: 'smartphone', label: 'Smartphone', desc: 'Android / iPhone device', icon: Smartphone },
  { id: 'basic', label: 'Basic Phone', desc: 'Feature phone / no web apps', icon: Phone },
  { id: 'none', label: 'No Personal Phone', desc: 'Rely on family / care network', icon: HelpCircle },
];

const INTERNET_OPTIONS = [
  { id: 'always', label: 'Always', desc: 'Broadband / mobile data' },
  { id: 'sometimes', label: 'Sometimes', desc: 'Unstable / limited data' },
  { id: 'rarely', label: 'Rarely', desc: 'Only in town / shared hotspots' },
  { id: 'never', label: 'Never', desc: 'No internet connection' },
];

const TIME_OPTIONS = [
  { id: 'morning', label: 'Morning (8–10 AM)', icon: '🌅' },
  { id: 'late-morning', label: 'Late Morning (10 AM–12 PM)', icon: '☀️' },
  { id: 'afternoon', label: 'Afternoon (2–4 PM)', icon: '🌤️' },
  { id: 'evening', label: 'Evening (6–8 PM)', icon: '🌙' },
];

export const RecoveryAccessStep: React.FC<RecoveryAccessStepProps> = ({ data, onChange }) => {
  const [langSearch, setLangSearch] = useState('');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Filter languages based on search query
  const filteredLanguages = LANGUAGES.filter(lang => 
    lang.toLowerCase().includes(langSearch.toLowerCase())
  );

  // Determine dynamic options for Question 3 (Communication Preference)
  const getCommunicationOptions = () => {
    const hasInternet = data.internetAvailability === 'Always' || data.internetAvailability === 'Sometimes';

    if (data.deviceType === 'Smartphone' && hasInternet) {
      return [
        { id: 'app', label: 'In-App Notifications (Recommended)', desc: 'Interact with your digital twin in real-time' },
        { id: 'sms', label: 'SMS Texts', desc: 'Get clean check-in questionnaire links via SMS' },
        { id: 'ivr', label: 'IVR Phone Calls', desc: 'Answer questions over a simple phone call' },
      ];
    }

    if (data.deviceType === 'Basic Phone' || (data.deviceType === 'Smartphone' && !hasInternet)) {
      return [
        { id: 'sms', label: 'SMS Texts', desc: 'Direct message interactive check-ins' },
        { id: 'ivr', label: 'IVR Phone Calls (Recommended)', desc: 'Receive automated check-in calls daily' },
      ];
    }

    if (data.deviceType === 'No Personal Phone') {
      return [
        { id: 'family', label: 'Family Member Phone', desc: 'Updates managed via a primary relative\'s phone' },
        { id: 'asha', label: 'ASHA Worker Assisted Recovery', desc: 'A community worker will visit you in person' },
      ];
    }

    return [];
  };

  const commOptions = getCommunicationOptions();

  // Reset communication preference if the option is no longer valid due to device/internet changes
  React.useEffect(() => {
    if (commOptions.length > 0) {
      const isValid = commOptions.some(opt => opt.label === data.communicationMode);
      if (!isValid) {
        onChange({ communicationMode: '' });
      }
    }
  }, [data.deviceType, data.internetAvailability]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-400 text-left font-sans">
      
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">Recovery Access & Connectivity</h2>
        <p className="text-xs sm:text-sm text-slate-655 font-medium leading-relaxed">
          Help us understand how we can best support your recovery journey, no matter where you live or what device you use.
        </p>
      </div>

      {/* QUESTION 1: What device do you regularly use? */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          1. What device do you regularly use?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DEVICE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = data.deviceType === opt.label;
            return (
              <button
                key={opt.id}
                onClick={() => onChange({ deviceType: opt.label })}
                type="button"
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between min-h-[110px] transition cursor-pointer select-none ${
                  isSelected 
                    ? 'bg-teal-55/60 border-teal-500 text-teal-700 shadow-xs' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-teal-500 text-white' : 'bg-slate-50 text-slate-500'} transition-colors`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold mt-2">{opt.label}</div>
                  <div className="text-[9px] text-slate-400 font-semibold leading-tight mt-0.5">{opt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* QUESTION 2: How often do you have internet access? */}
      {data.deviceType && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <label className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Wifi className="w-4 h-4 text-teal-600" />
            2. How often do you have internet access?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {INTERNET_OPTIONS.map((opt) => {
              const isSelected = data.internetAvailability === opt.label;
              return (
                <button
                  key={opt.id}
                  onClick={() => onChange({ internetAvailability: opt.label })}
                  type="button"
                  className={`p-3 rounded-xl border text-center transition cursor-pointer select-none ${
                    isSelected 
                      ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold shadow-2xs' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 text-xs font-semibold'
                  }`}
                >
                  <span className="text-xs">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* QUESTION 3: How would you like to receive your daily recovery check-ins? */}
      {data.deviceType && data.internetAvailability && commOptions.length > 0 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <label className="block text-sm font-bold text-slate-800">
            3. How would you like to receive your daily recovery check-ins?
          </label>
          <div className="flex flex-col gap-2.5">
            {commOptions.map((opt) => {
              const isSelected = data.communicationMode === opt.label;
              return (
                <button
                  key={opt.id}
                  onClick={() => onChange({ communicationMode: opt.label })}
                  type="button"
                  className={`p-3.5 rounded-xl border text-left flex items-start justify-between gap-3 transition cursor-pointer select-none ${
                    isSelected 
                      ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-xs' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold block">{opt.label}</span>
                    <span className="text-[10px] text-slate-400 font-medium block">{opt.desc}</span>
                  </div>
                  {isSelected && (
                    <div className="p-1 rounded-full bg-teal-500 text-white shrink-0 mt-1 animate-in zoom-in-50 duration-150">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Language and Preferred Time Split */}
      {data.communicationMode && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* QUESTION 4: Preferred Language (Searchable Dropdown) */}
          <div className="space-y-3 text-left relative">
            <label className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-teal-600" />
              4. Preferred Language
            </label>
            
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-bold flex items-center justify-between shadow-2xs hover:border-slate-300 focus:outline-none transition cursor-pointer"
              >
                <span>{data.preferredLanguage || 'Select Language'}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 max-h-56 overflow-y-auto flex flex-col p-2 space-y-1.5 animate-in slide-in-from-top-1 duration-150">
                  <div className="relative px-2.5 py-1.5 flex items-center gap-2 border-b border-slate-100 mb-1">
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search language..."
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      className="w-full bg-transparent border-none text-xs text-slate-750 focus:outline-none placeholder:text-slate-400 font-semibold"
                    />
                  </div>
                  {filteredLanguages.length > 0 ? (
                    filteredLanguages.map((lang) => {
                      const isSelected = data.preferredLanguage === lang;
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            onChange({ preferredLanguage: lang });
                            setLangDropdownOpen(false);
                            setLangSearch('');
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                            isSelected ? 'bg-teal-50 text-teal-700' : 'hover:bg-slate-50 text-slate-755'
                          }`}
                        >
                          <span>{lang}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 stroke-[2.5]" />}
                        </button>
                      );
                    })
                  ) : (
                    <span className="text-[10px] text-slate-400 font-bold text-center py-4">No languages matched</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* QUESTION 5: Preferred Time for Daily Recovery Check-ins */}
          <div className="space-y-3 text-left">
            <label className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              5. Preferred Contact Time
            </label>
            <div className="flex flex-col gap-2">
              {TIME_OPTIONS.map((opt) => {
                const isSelected = data.preferredContactTime === opt.label;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onChange({ preferredContactTime: opt.label })}
                    type="button"
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition cursor-pointer select-none ${
                      isSelected 
                        ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold shadow-2xs' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 text-xs font-semibold'
                    }`}
                  >
                    <span className="text-base select-none">{opt.icon}</span>
                    <span className="text-xs">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
