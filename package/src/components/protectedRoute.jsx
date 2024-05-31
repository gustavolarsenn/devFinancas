import React, { useContext } from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from './authProvider';

const ProtectedRoute = ({ path, element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;