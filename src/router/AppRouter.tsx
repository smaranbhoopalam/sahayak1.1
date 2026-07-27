import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';

// Base Pages
import { LandingPage } from '../pages/LandingPage';
import { SettingsPage } from '../pages/SettingsPage';

// Login & Registration Folder (`src/pages/auth`)
import {
  LoginPage,
  PatientRegisterPage,
  DoctorRegisterPage,
} from '../pages/auth';

// All Dashboards Folder (`src/pages/dashboards`)
import {
  PatientDashboard,
  DailyUpdatePage,
  PatientTimelinePage,
  PatientReportPage,
  DoctorDashboard,
  DoctorPatientDetailsPage,
  GuardianDashboard,
  AdminDashboard,
  DigitalTwinPage,
} from '../pages/dashboards';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Public / Auth & Registration Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/patient" element={<PatientRegisterPage />} />
          <Route path="/register/doctor" element={<DoctorRegisterPage />} />

          {/* Patient Dashboard Routes */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/update" element={<DailyUpdatePage />} />
          <Route path="/patient/timeline" element={<PatientTimelinePage />} />
          <Route path="/patient/report" element={<PatientReportPage />} />

          {/* Doctor Dashboard Routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<DoctorDashboard />} />
          <Route path="/doctor/patient/:id" element={<DoctorPatientDetailsPage />} />
          <Route path="/doctor/patient/:id/twin" element={<DigitalTwinPage />} />
          <Route path="/doctor/digital-twin" element={<DigitalTwinPage />} />
          <Route path="/doctor/reports" element={<PatientReportPage />} />
          <Route path="/doctor/appointments" element={<DoctorDashboard />} />
          <Route path="/doctor/notifications" element={<DoctorDashboard />} />

          {/* Guardian Dashboard Routes */}
          <Route path="/guardian/dashboard" element={<GuardianDashboard />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Settings Route */}
          <Route path="/settings" element={<SettingsPage />} />

          {/* Fallback Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
