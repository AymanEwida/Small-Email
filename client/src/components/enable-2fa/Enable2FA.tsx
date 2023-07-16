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

import './enable-2fa.css';

interface Enable2FAProps {
  closeEnable2FA : Void,
}

const Enable2FA: React.FC<Enable2FAProps> = ({ closeEnable2FA }) => {

  const [password, setPassword] = useState('');

  function handlePassword (event: Event<InputElement>): void {
    setPassword(event.target.value);
  }

  function handleSubmit (event: FormEvent): void {
    event.preventDefault();

    console.log('I submited wow!');
  }

  return (
    <SettingsItemHeader
     title='Enable 2FA'
     closeFunc={closeEnable2FA}
    >
      <form 
       className='p-4 flex flex-col gap-4 items-start'
       onSubmit={handleSubmit}
      >
        <Input
         type='text'
         id='password'
         label='Password'
         value={password}
         customFunc={handlePassword}
        />
        <Button
         type='submit'
         paddingSize='2'
         text='Enable 2FA'
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

export default Enable2FA;