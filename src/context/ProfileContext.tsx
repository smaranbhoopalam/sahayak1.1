import React, { createContext, useContext, useState } from 'react';

interface ProfileContextType {
  displayName: string;       // first name for avatar initial
  patientName: string;       // full name used everywhere in the app
  setDisplayName: (name: string) => void;
  setPatientName: (name: string) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  displayName: 'Rahul Sharma',
  patientName: 'Rahul Sharma',
  setDisplayName: () => {},
  setPatientName: () => {},
});

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patientName, setPatientNameState] = useState('Rahul Sharma');

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
        setDisplayName,
        setPatientName,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
