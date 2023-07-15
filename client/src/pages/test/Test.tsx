import React from 'react'

import {
  PasswordInstructionCard
} from '../../components';

import './test.css';

const Test: React.FC = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <PasswordInstructionCard />
    </div>
  );  
}

export default Test;