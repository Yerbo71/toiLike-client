import React, { createContext, useEffect, useState } from 'react';
import { checkAuth, login, logout } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  signIn?: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; token?: string }>;
  signOut?: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const auth = await checkAuth();
      setIsAuthenticated(auth.isAuthenticated);
      setToken(auth.token ?? null);
    };
    verifyAuth();
  }, []);

  const signIn = async (username: string, password: string) => {
    const result = await login(username, password);
    if (result.success) {
      setIsAuthenticated(true);
      setToken(result.token ?? null);
    }
    return result;
  };

  const signOut = async () => {
    await logout();
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
