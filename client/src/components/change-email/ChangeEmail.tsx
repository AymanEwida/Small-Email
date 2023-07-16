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

import './change-email.css';

interface ChangeEmailProps {
  closeChangeEmail: Void,
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ closeChangeEmail }) => {

  const [inputsValue, setInputsValue] = useState({
    newEmail: '',
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
     title='Change Email'
     closeFunc={closeChangeEmail}
    >
      <form 
       className='p-4 flex flex-col gap-4 items-start'
       onSubmit={handleSubmit}
      >
        <Input
         type='email'
         id='newEmail'
         label='New Email'
         name='newEmail'
         value={inputsValue.newEmail}
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
         text='Change Email'
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

export default ChangeEmail;