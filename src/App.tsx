import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MenuIcon from './assets/icons/menu.svg';
import logoSrc from './assets/images/logo.png';
import { Header } from './components/Header/Header';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Login = lazy(() => import('./pages/Login/Login'));
const Settings = lazy(() => import('./pages/Settings/Settings'));

function App() {
  return (
    <div>
      <Header />
      <h1>Hello World!</h1>
      <p>React++</p>

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
}

export default App;
