import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './loadingSpinner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      const response = await axios.get('http://localhost:8000/auth', { withCredentials: true });
      setIsAuthenticated(response.data.access);
      setIsLoading(false);
    };

    checkAuthenticationStatus();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};