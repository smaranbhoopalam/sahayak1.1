import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

interface AuthContextType {
  role: UserRole | null;
  login: (newRole: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('sahayak_mock_role');
    if (savedRole) {
      setRole(savedRole as UserRole);
    }
    setIsLoading(false);
  }, []);

  const login = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('sahayak_mock_role', newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('sahayak_mock_role');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
