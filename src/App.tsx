import React from 'react';
import { AppRouter } from './router/AppRouter';
import { LanguageProvider } from './context/LanguageContext';
import { ProfileProvider } from './context/ProfileContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ProfileProvider>
          <AppRouter />
        </ProfileProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
