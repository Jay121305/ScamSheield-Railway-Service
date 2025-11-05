import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { sampleUsers } from '../constants';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email) => {
    const normalizedEmail = email.toLowerCase();
    const foundUser = sampleUsers.find((candidate) => candidate.email.toLowerCase() === normalizedEmail);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }

    const nameFromEmail = normalizedEmail.split('@')[0];
    const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    setUser({
      id: Date.now(),
      name: capitalizedName,
      email: normalizedEmail,
      role: 'passenger',
    });
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
