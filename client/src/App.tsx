import React from 'react'

import {
  Navbar
} from './components';

import './App.css';

const App: React.FC = () => {
  return (
    <div className=''>
      <Navbar />
      <div className=''>
        App
      </div>
    </div>
  );
}

export default App;