import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not logged in -> redirect to login
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Role not authorized -> redirect to their default home dashboard
  if (!allowedRoles.includes(role)) {
    if (role === 'patient') {
      return <Navigate to="/patient/dashboard" replace />;
    }
    if (role === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    }
    if (role === 'guardian') {
      return <Navigate to="/guardian/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
