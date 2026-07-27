import { useState, useEffect } from 'react';
import { UserRole } from '../types';

export function useAuthMock() {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('sahayak_mock_role');
    return (saved as UserRole) || 'patient';
  });

  const changeRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('sahayak_mock_role', newRole);
  };

  useEffect(() => {
    const saved = localStorage.getItem('sahayak_mock_role');
    if (saved) {
      setRole(saved as UserRole);
    }
  }, []);

  return {
    role,
    changeRole,
  };
}
