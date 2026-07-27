import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, X, Edit2, Save, Camera,
  Calendar, Mail, Phone, MapPin, Heart,
  Pill, FileText, Star, Shield, Activity,
  ChevronRight
} from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

interface ProfileData {
  // Personal
  name: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  bloodGroup: string;
  // Medical
  condition: string;
  surgery: string;
  surgeryDate: string;
  doctor: string;
  hospital: string;
  medications: string;
  allergies: string;
  // Personal Review
  recoveryReview: string;
  painLevel: string;
  mood: string;
}

const defaultProfile: ProfileData = {
  name: 'Rahul Sharma',
  dob: '1995-04-12',
  gender: 'Male',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  address: 'Bangalore, Karnataka, India',
  bloodGroup: 'O+',
  condition: 'Post-ACL Reconstruction Surgery',
  surgery: 'ACL Reconstruction (Right Knee)',
  surgeryDate: '2025-07-14',
  doctor: 'Dr. Ananya Roy',
  hospital: 'Manipal Hospital, Bangalore',
  medications: 'Ibuprofen 400mg, Physiotherapy supplements',
  allergies: 'Penicillin, Sulfa drugs',
  recoveryReview: 'Feeling much better after Day 12. Pain has reduced significantly. Able to walk short distances with minimal support.',
  painLevel: '3',
  mood: 'Optimistic',
};

// ─── Field component OUTSIDE ProfilePanel ──────────────────────────────────
// IMPORTANT: Must be defined outside to keep a stable reference and prevent
// React from unmounting/remounting inputs on every keystroke (focus loss bug).
interface FieldProps {
  label: string;
  icon: React.ElementType;
  fieldKey: keyof ProfileData;
  type?: string;
  textarea?: boolean;
  editMode: boolean;
  draft: ProfileData;
  profile: ProfileData;
  set: (key: keyof ProfileData, val: string) => void;
}

const inputClass =
  'w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-400 transition-colors';
const readClass = 'text-sm text-slate-800 font-semibold';

const Field: React.FC<FieldProps> = ({ label, icon: Icon, fieldKey, type = 'text', textarea = false, editMode, draft, profile, set }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
      <Icon className="w-3 h-3" /> {label}
    </label>
    {editMode ? (
      textarea ? (
        <textarea
          className={`${inputClass} resize-none h-24`}
          value={draft[fieldKey]}
          onChange={(e) => set(fieldKey, e.target.value)}
        />
      ) : (
        <input
          type={type}
          className={inputClass}
          value={draft[fieldKey]}
          onChange={(e) => set(fieldKey, e.target.value)}
          autoComplete="off"
        />
      )
    ) : (
      <p className={readClass}>{profile[fieldKey] || '—'}</p>
    )}
  </div>
);
// ─────────────────────────────────────────────────────────────────────────────

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(defaultProfile);
  const [activeTab, setActiveTab] = useState<'personal' | 'medical' | 'review'>('personal');
  const [showSuccess, setShowSuccess] = useState(false);

  const { setDisplayName } = useProfile();

  const handleEdit = () => {
    setDraft({ ...profile });
    setEditMode(true);
  };

  const handleSave = () => {
    setProfile({ ...draft });
    setDisplayName(draft.name); // sync Header avatar letter
    setEditMode(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3200);
  };

  const handleCancel = () => {
    setDraft({ ...profile });
    setEditMode(false);
  };

  const set = (key: keyof ProfileData, val: string) => {
    setDraft((d) => ({ ...d, [key]: val }));
  };

  // Shared props passed to every Field — avoids prop drilling repetition
  const fieldProps = { editMode, draft, profile, set };

  const tabs: { id: 'personal' | 'medical' | 'review'; label: string; icon: React.ElementType }[] = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'medical', label: 'Medical', icon: Heart },
    { id: 'review', label: 'My Review', icon: Star },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-50"
          />

          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl shadow-slate-900/20 z-50 flex flex-col overflow-hidden"
          >
            {/* ✅ ZOMATO-STYLE SUCCESS OVERLAY */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute inset-0 z-50 bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-400 flex flex-col items-center justify-center gap-6"
                >
                  {/* Animated Tick Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
                    className="w-28 h-28 rounded-full bg-white/20 border-4 border-white flex items-center justify-center shadow-xl"
                  >
                    <motion.svg
                      viewBox="0 0 52 52"
                      className="w-16 h-16"
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.circle
                        cx="26" cy="26" r="25"
                        fill="none" stroke="white" strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                      <motion.path
                        fill="none" stroke="white" strokeWidth="4"
                        strokeLinecap="round" strokeLinejoin="round"
                        d="M 14 27 L 22 35 L 38 18"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.55 }}
                      />
                    </motion.svg>
                  </motion.div>

                  {/* Message Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="text-center px-8 space-y-2"
                  >
                    <p className="text-4xl">👍</p>
                    <h2 className="text-white text-2xl font-black tracking-tight leading-tight">
                      Hello Champ!
                    </h2>
                    <p className="text-white/90 text-base font-semibold leading-snug">
                      Your details are edited successfully!
                    </p>
                    <p className="text-white/70 text-xs font-medium mt-1">
                      Changes saved & synced to your profile ✨
                    </p>
                  </motion.div>

                  {/* Subtle Progress Bar at Bottom */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1.5 bg-white/50 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.0, ease: 'linear', delay: 0.2 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-400 px-6 py-5 flex items-start gap-4 shrink-0">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-2xl font-black">
                  {(editMode ? draft.name : profile.name).charAt(0).toUpperCase() || '?'}
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Camera className="w-3.5 h-3.5 text-brand-600" />
                </button>
              </div>

              {/* Name & Info */}
              <div className="flex-1 min-w-0 pt-1">
                <h2 className="text-white font-black text-lg leading-tight truncate">
                  {editMode ? draft.name : profile.name}
                </h2>
                <p className="text-brand-100 text-xs font-semibold truncate">
                  {editMode ? draft.email : profile.email}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                    {editMode ? draft.bloodGroup : profile.bloodGroup} Blood
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                    {editMode ? draft.gender : profile.gender}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors mt-1 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 shrink-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-bold transition-all border-b-2 ${
                      activeTab === tab.id
                        ? 'border-brand-500 text-brand-600 bg-brand-50/50'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Edit / Save Controls */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-slate-50 border-b border-slate-100 shrink-0">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                {editMode ? 'Editing your profile…' : 'Your profile is private & secure'}
              </span>
              {!editMode ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                </div>
              )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
              {/* PERSONAL TAB */}
              {activeTab === 'personal' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Full Name" icon={User} fieldKey="name" {...fieldProps} />
                    <Field label="Date of Birth" icon={Calendar} fieldKey="dob" type="date" {...fieldProps} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Gender" icon={User} fieldKey="gender" {...fieldProps} />
                    <Field label="Blood Group" icon={Heart} fieldKey="bloodGroup" {...fieldProps} />
                  </div>
                  <Field label="Email Address" icon={Mail} fieldKey="email" type="email" {...fieldProps} />
                  <Field label="Phone Number" icon={Phone} fieldKey="phone" {...fieldProps} />
                  <Field label="Address" icon={MapPin} fieldKey="address" textarea {...fieldProps} />
                </div>
              )}

              {/* MEDICAL TAB */}
              {activeTab === 'medical' && (
                <div className="space-y-5">
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-2.5">
                    <Activity className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-black text-rose-700">Current Condition</p>
                      <p className="text-xs text-rose-600 font-semibold mt-0.5">{profile.condition}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-rose-400 ml-auto mt-0.5 shrink-0" />
                  </div>

                  <Field label="Primary Condition" icon={Activity} fieldKey="condition" {...fieldProps} />
                  <Field label="Surgery / Procedure" icon={FileText} fieldKey="surgery" {...fieldProps} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Surgery Date" icon={Calendar} fieldKey="surgeryDate" type="date" {...fieldProps} />
                    <Field label="Attending Doctor" icon={User} fieldKey="doctor" {...fieldProps} />
                  </div>
                  <Field label="Hospital / Clinic" icon={MapPin} fieldKey="hospital" {...fieldProps} />
                  <Field label="Current Medications" icon={Pill} fieldKey="medications" textarea {...fieldProps} />
                  <Field label="Known Allergies" icon={Shield} fieldKey="allergies" {...fieldProps} />
                </div>
              )}

              {/* REVIEW TAB */}
              {activeTab === 'review' && (
                <div className="space-y-5">
                  {/* Pain Level */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Heart className="w-3 h-3" /> Current Pain Level (0–10)
                    </label>
                    {editMode ? (
                      <div className="space-y-1">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={draft.painLevel}
                          onChange={(e) => set('painLevel', e.target.value)}
                          className="w-full accent-brand-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                          <span>0 (None)</span>
                          <span className="text-brand-600 font-black text-sm">{draft.painLevel}/10</span>
                          <span>10 (Severe)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-rose-500 rounded-full transition-all"
                            style={{ width: `${(Number(profile.painLevel) / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-black text-slate-800">{profile.painLevel}/10</span>
                      </div>
                    )}
                  </div>

                  {/* Mood */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Star className="w-3 h-3" /> Current Mood
                    </label>
                    {editMode ? (
                      <div className="grid grid-cols-4 gap-2">
                        {['Anxious', 'Low', 'Neutral', 'Optimistic', 'Great', 'Excellent'].map((m) => (
                          <button
                            key={m}
                            onClick={() => set('mood', m)}
                            className={`px-2 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                              draft.mood === m
                                ? 'bg-brand-500 text-white border-brand-500'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-300'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold">
                        😊 {profile.mood}
                      </span>
                    )}
                  </div>

                  {/* Personal Recovery Review */}
                  <Field
                    label="Personal Recovery Review"
                    icon={Star}
                    fieldKey="recoveryReview"
                    textarea
                    {...fieldProps}
                  />

                  {/* Recovery Score Visual */}
                  {!editMode && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-sky-50 border border-brand-100">
                      <p className="text-xs font-black text-brand-700 mb-2 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" /> Recovery Snapshot
                      </p>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <p className="text-xl font-black text-brand-600">92%</p>
                          <p className="text-[9px] text-slate-500 font-bold">Confidence Score</p>
                        </div>
                        <div>
                          <p className="text-xl font-black text-emerald-600">0.8</p>
                          <p className="text-[9px] text-slate-500 font-bold">Drift Index</p>
                        </div>
                        <div>
                          <p className="text-xl font-black text-purple-600">D12</p>
                          <p className="text-[9px] text-slate-500 font-bold">Post-Op Day</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
