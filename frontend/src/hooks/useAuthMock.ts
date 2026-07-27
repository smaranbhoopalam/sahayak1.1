import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export function useAuthMock() {
  const { role, login, logout } = useAuth();

  return {
    role: role || 'patient',
    changeRole: (newRole: UserRole) => login(newRole),
    logout,
  };
}
