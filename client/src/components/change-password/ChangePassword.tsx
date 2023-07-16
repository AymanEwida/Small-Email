import React, { useState } from 'react';

import { FaLock } from 'react-icons/fa';

import SettingsItemHeader from '../settings-item-header/SettingsItemHeader';
import Input from '../input/Input';
import Button from '../button/Button';

import {
  Void,
  Event,
  FormEvent,
  InputElement
} from '../../types/types';

import './change-password.css';

interface ChangePasswordProps {
  closeChangePassword: Void,
  open2FA : Void
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ closeChangePassword, open2FA }) => {

  const [inputsValue, setInputsValue] = useState({
    newPassword: '',
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
     title='Change Password'
     closeFunc={closeChangePassword}
    >
       <form 
       className='p-4 flex flex-col gap-4 w-full'
       onSubmit={handleSubmit}
      >
        <Input
         type='password'
         id='newPassword'
         label='New Password'
         name='newPassword'
         value={inputsValue.newPassword}
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
        <span className='text-left'>
          <Button
           type='submit'
           paddingSize='2'
           text='Change Password'
           bgColor='rgb(74 222 128)'
           color='white'
           borderRadius='10px'
           textSize='md'
          />
        </span>
      </form>
      <div className='border-t-1 border-inherit w-full pt-3'>
        <h1 className='text-center text-xl text-green-600'>
          Two-factor Authentication
        </h1>
        <div className='mt-4 flex flex-col items-center'>
          <span className='text-xl mb-2 text-gray-500'>
            <FaLock />
          </span>
          <h1 className='text-2xl font-bold mb-1 text-red-400'>
            Two-factor Authentication is not enabled yet.
          </h1>
          <p className='w-96 text-center mb-3 text-gray-400'>
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
          </p>
          <Button
           type='button'
           bgColor='rgb(16 185 129)'
            width='fit'
           text='Enable Two-factor Authentication'
           textSize='md'
           paddingSize='2'
           color='black'
           borderRadius='10px'
           customFunc={open2FA} 
          />
        </div>
      </div>
    </SettingsItemHeader>
  )
}

export default ChangePassword;