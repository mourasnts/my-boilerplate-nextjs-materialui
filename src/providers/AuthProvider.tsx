import React, { ReactNode, ReactElement } from 'react';

import dpge_acesso_api from '../services/DpgeAcessoApi';
import { AuthContextType } from '../interfaces/Globals';

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      let headers = {};
      const current_user = localStorage.getItem('current-user');
      if (current_user) {
        const token = JSON.parse(current_user).token;
        headers = { headers: { Authorization: `Bearer ${token}` } };
      }
      const { data } = await dpge_acesso_api.post('current-user', {}, headers);
      setAuthenticated(data !== false);
      setLoading(false);
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useIsAuthenticated(): boolean {
  const context = useAuth();
  return context.isAuthenticated;
}
