import React from 'react';
import { hot } from 'react-hot-loader/root';

import MenuIcon from './assets/icons/menu.svg';
import logoSrc from './assets/images/logo.png';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div>
      <Header />
      <h1>Hello World!</h1>
      <p>React++</p>

      <img src={logoSrc} alt="logo" />
      <br />
      <MenuIcon />
    </div>
  );
}

export default hot(App);
