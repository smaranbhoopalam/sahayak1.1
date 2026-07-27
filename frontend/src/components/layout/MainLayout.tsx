import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Full-width pages without sidebar (landing page, auth pages, onboarding)
  const isFullWidthPage = ['/', '/login', '/register/patient', '/register/doctor', '/onboarding'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {location.pathname !== '/' && (
        <Header
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />
      )}

      {/* Main viewport area, accounting for fixed Header height */}
      <div className={`flex-1 flex flex-col ${location.pathname !== '/' ? 'pt-[68px]' : ''}`}>
        {isFullWidthPage ? (
          <main className="flex-1 w-full">{children}</main>
        ) : (
          <div className="flex-1 flex w-full relative">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 w-full">{children}</main>
          </div>
        )}
      </div>
    </div>
  );
};
