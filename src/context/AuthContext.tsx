import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // TODO replace with actual logic
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = await AsyncStorage.getItem('accessToken');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(true);
        setToken(null);
      }
    };
    verifyAuth();
  }, []);

  // Функция для входа
  const signIn = async (newToken: string) => {
    await AsyncStorage.setItem('accessToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  // Функция для выхода
  const signOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
