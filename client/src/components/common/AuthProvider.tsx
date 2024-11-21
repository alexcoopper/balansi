// src/components/AuthProvider.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../../store/authSlice';
import Loader from './Loader';
import { AuthService } from '../../services/AuthService';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await AuthService.checkAuth();
        dispatch(setAuthenticated(response));
      } catch (error) {
        dispatch(setAuthenticated(false));
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
