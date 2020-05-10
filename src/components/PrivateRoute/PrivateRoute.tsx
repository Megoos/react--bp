import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

export const PrivateRoute: React.FC<PrivateRouteProps & RouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') || true;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: props.location }} />
      }
    />
  );
};
