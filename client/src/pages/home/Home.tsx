import React from 'react';

import {
  Navbar
} from '../../components';

import './home.css';

const Home: React.FC = () => {
  return (
    <div className='pt-16'>
      <Navbar />
      <div className=''>
        Home
      </div>
    </div>
  )
}

export default Home;