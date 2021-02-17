import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from 'components/Header';

import MenuIcon from './assets/icons/menu.svg';
import logoSrc from './assets/images/logo.png';
import { ComponentA } from './components/ComponentA';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Login = lazy(() => import('./pages/Login/Login'));
const Settings = lazy(() => import('./pages/Settings/Settings'));

export interface RequestOptions {
  method: 'PUT' | 'POST' | 'GET' | 'DELETE';
  headers: { [key: string]: string };
  body?: string;
}

export const App: React.FC = () => {
  const [variant, setVariant] = useState<'mobile' | 'desktop'>();

  useEffect(() => {
    setTimeout(() => {
      setVariant('desktop');
    }, 5000);

    setTimeout(() => {
      setVariant('mobile');
    }, 15000);
  }, []);

  return (
    <div>
      <Header />
      <h1>Hello World!</h1>
      <p>React++</p>

      {variant && <ComponentA variant={variant} />}

      <img src={logoSrc} alt="logo" />
      <br />
      <MenuIcon />

      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute exact={true} path="/" component={Dashboard} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
