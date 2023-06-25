/** @format */

import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from './AuthContext';
import { useUser } from '../context/user/UserContext';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const { isLoggedIn } = useUser();
  const location = useLocation();

  if (!auth?.auth && isLoggedIn) {
    return <Navigate to='/signin' state={{ path: location.pathname }} replace />;
  }

  return children;
};

export default RequireAuth;
