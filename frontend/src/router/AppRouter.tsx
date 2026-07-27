import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';

// Base Pages
import LandingPage from '../pages/Landing/LandingPage';
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

import { useNavigate } from 'react-router-dom';
import { Onboarding } from '../pages/onboarding/Onboarding';
import { RecoveryTwinHome } from '../pages/recovery-twin/RecoveryTwinHome';
import { ProtectedRoute } from './ProtectedRoute';

// Wrappers to safely consume useNavigate inside the BrowserRouter context
const OnboardingWrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Onboarding
      onComplete={(data) => {
        localStorage.setItem('sahayak_onboarding_data_saved', JSON.stringify(data));
        navigate('/recovery-twin');
      }}
    />
  );
};

const RecoveryTwinWrapper: React.FC = () => {
  const navigate = useNavigate();
  const dataStr = localStorage.getItem('sahayak_onboarding_data_saved');
  const onboardingData = dataStr ? JSON.parse(dataStr) : undefined;

  return (
    <RecoveryTwinHome
      onboardingData={onboardingData}
      onBackToOnboarding={() => navigate('/onboarding')}
    />
  );
};

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

          {/* Onboarding & Recovery Twin Routes */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute allowedRoles={['patient', 'doctor', 'guardian']}>
                <OnboardingWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recovery-twin"
            element={
              <ProtectedRoute allowedRoles={['patient', 'doctor', 'guardian']}>
                <RecoveryTwinWrapper />
              </ProtectedRoute>
            }
          />

          {/* Patient Dashboard Routes (Accessible by Patient, Doctor, and Guardian) */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute allowedRoles={['patient', 'doctor', 'guardian']}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/update"
            element={
              <ProtectedRoute allowedRoles={['patient', 'doctor', 'guardian']}>
                <DailyUpdatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/timeline"
            element={
              <ProtectedRoute allowedRoles={['patient', 'doctor', 'guardian']}>
                <PatientTimelinePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/report"
            element={
              <ProtectedRoute allowedRoles={['patient', 'doctor', 'guardian']}>
                <PatientReportPage />
              </ProtectedRoute>
            }
          />

          {/* Doctor Dashboard Routes (Accessible only by Doctor) */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/patients"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/patient/:id"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorPatientDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/patient/:id/twin"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DigitalTwinPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/digital-twin"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DigitalTwinPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/reports"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <PatientReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/notifications"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Guardian Dashboard Routes (Accessible only by Guardian) */}
          <Route
            path="/guardian/dashboard"
            element={
              <ProtectedRoute allowedRoles={['guardian']}>
                <GuardianDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard Routes (Accessible by Doctor) */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Settings Route (Accessible by all logged in roles) */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={['patient', 'doctor', 'guardian']}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
