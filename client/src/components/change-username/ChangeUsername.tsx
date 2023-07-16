import React, { useState } from 'react';

import SettingsItemHeader from '../settings-item-header/SettingsItemHeader';
import Input from '../input/Input';
import Button from '../button/Button';

import {
  Void,
  Event,
  FormEvent,
  InputElement
} from '../../types/types';

import './change-username.css';

interface ChangeUsernameProps {
  closeChangeUsername: Void
}

const ChangeUsername: React.FC<ChangeUsernameProps> = ({ closeChangeUsername }) => {

  const [inputsValue, setInputsValue] = useState({
    newUsername: '',
    password: ''
  });

  function handleInputsValue (event: Event<InputElement>): void {
    setInputsValue(prevInputsValue => (
      {
        ...prevInputsValue,
        [event.target.name]: event.target.value
      }
    ));
  }

  function handleSubmit (event: FormEvent): void {
    event.preventDefault();

    console.log('I submited wow!');
  }

  return (
    <SettingsItemHeader
     title='Change Username'
     closeFunc={closeChangeUsername}
    >
      <form 
       className='p-4 flex flex-col gap-4 items-start'
       onSubmit={handleSubmit}
      >
        <Input
         type='text'
         id='newUsername'
         label='New Username'
         name='newUsername'
         value={inputsValue.newUsername}
         customFunc={handleInputsValue}
        />
        <Input
         type='password'
         id='password'
         label='Password'
         name='password'
         value={inputsValue.password}
         customFunc={handleInputsValue}
        />
        <Button
         type='submit'
         paddingSize='2'
         text='Change Username'
         bgColor='rgb(74 222 128)'
         color='white'
         borderRadius='10px'
         textSize='md'
         width='fit' 
        />
      </form>
    </SettingsItemHeader>
  )
}

export default ChangeUsername;