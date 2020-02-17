import React from 'react';

import { hot } from 'react-hot-loader/root';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div>
      <Header />
      <h1>Hello World!</h1> <p>React++</p>
    </div>
  );
}

export default hot(App);
