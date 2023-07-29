import React, { useState } from 'react'

import {
  Input,
  FoundUsers
} from '../../components';

import {
  Event,
  InputElement
} from '../../types/types';

import './test.css';

const Test: React.FC = () => {

  const [searchByEmail, setSearchByEmail] = useState("");

  function handleSearch (event: Event<InputElement>): void {
    setSearchByEmail(event.target.value);
  }

  console.log({ searchByEmail });

  return (
    <div className='h-screen flex items-center justify-center'>
      <form>
        <Input
         type='text'
         id='searchByEmail'
         label='Search by email'
         value={searchByEmail}
         customFunc={handleSearch} 
        />
        <FoundUsers email={searchByEmail} />
      </form>
    </div>
  );  
}

export default Test;