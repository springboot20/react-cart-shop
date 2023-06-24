/** @format */

import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from './AuthContext';

const RequireAuth = ({children}) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.auth) {
    return <Navigate to='/signin' state={{ path: location.pathname }} replace />;
  }

  return children
};

export default RequireAuth;