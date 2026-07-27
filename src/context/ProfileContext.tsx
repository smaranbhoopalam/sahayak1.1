import React, { createContext, useContext, useState } from 'react';

interface ProfileContextType {
  displayName: string;       // first name for avatar initial
  patientName: string;       // full name used everywhere in the app
  patientPhone: string;      // patient phone number used in IVR calling
  setDisplayName: (name: string) => void;
  setPatientName: (name: string) => void;
  setPatientPhone: (phone: string) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  displayName: 'Rahul Sharma',
  patientName: 'Rahul Sharma',
  patientPhone: '+91 98765 43210',
  setDisplayName: () => {},
  setPatientName: () => {},
  setPatientPhone: () => {},
});

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patientName, setPatientNameState] = useState('Rahul Sharma');
  const [patientPhone, setPatientPhone] = useState('+91 98765 43210');

  // displayName always stays in sync with patientName
  const setPatientName = (name: string) => {
    setPatientNameState(name);
  };

  // For backward compat with Header/ProfilePanel
  const setDisplayName = (name: string) => {
    setPatientNameState(name);
  };

  return (
    <ProfileContext.Provider
      value={{
        displayName: patientName,
        patientName,
        patientPhone,
        setDisplayName,
        setPatientName,
        setPatientPhone,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
