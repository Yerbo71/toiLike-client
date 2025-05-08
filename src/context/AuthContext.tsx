import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { operations } from '@/src/types/api2';
import { getCurrentUser } from '@/src/core/rest/user';

type User = operations['getCurrentUser']['responses'][200]['content']['*/*'];

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = await AsyncStorage.getItem('accessToken');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        try {
          const currentUser = await getCurrentUser(storedToken);
          setUser(currentUser);
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
      }
    };
    verifyAuth();
  }, []);

  const signIn = async (newToken: string) => {
    await AsyncStorage.setItem('accessToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    try {
      const currentUser = await getCurrentUser(newToken);
      setUser(currentUser);
    } catch (error) {
      console.error('Error fetching user on signIn:', error);
      setUser(null);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };
  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, signIn, signOut, user, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
