import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';
import { sampleUsers } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string): boolean => {
    const normalizedEmail = email.toLowerCase();
    // Check for predefined users first (e.g., admin)
    const foundUser = sampleUsers.find(u => u.email.toLowerCase() === normalizedEmail);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }

    // If not found, create a new passenger user on-the-fly
    const nameFromEmail = normalizedEmail.split('@')[0];
    const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    
    const newUser: User = {
        id: Date.now(), // Use a simple unique ID for the session
        name: capitalizedName,
        email: normalizedEmail,
        role: 'passenger',
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};