import React from 'react';
import { AppRouter } from './router/AppRouter';
import { LanguageProvider } from './context/LanguageContext';
import { ProfileProvider } from './context/ProfileContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ProfileProvider>
          <AppRouter />
        </ProfileProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
