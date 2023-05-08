import React from 'react'

import {
  Navbar
} from './components';

import './App.css';

const App: React.FC = () => {
  return (
    <div className='bg-secondary-dark-bg'>
      <Navbar />
      App
    </div>
  );
}

export default App;