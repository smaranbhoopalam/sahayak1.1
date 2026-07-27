import React from 'react';
import { AppRouter } from './router/AppRouter';
import { LanguageProvider } from './context/LanguageContext';
import { ProfileProvider } from './context/ProfileContext';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ProfileProvider>
        <AppRouter />
      </ProfileProvider>
    </LanguageProvider>
  );
};

export default App;
