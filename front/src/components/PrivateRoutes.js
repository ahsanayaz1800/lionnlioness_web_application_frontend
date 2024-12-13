import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Utility function to check if admin token is present in localStorage or sessionStorage
const isAdminAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) return false;

  try {
    // Optionally decode the token to check its validity
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // JWT is in base64 encoded format
    const expiry = decodedToken.exp * 1000; // Token expiry time is in seconds, converting to ms
    if (expiry > Date.now()) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Invalid token', error);
    return false;
  }
};

// Custom PrivateRoute component to protect routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdminAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
