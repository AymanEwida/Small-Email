import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useMutation } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import SettingsItemHeader from '../settings-item-header/SettingsItemHeader';
import Input from '../input/Input';
import Button from '../button/Button';
import LoadingComponent from '../loading-component/LoadingComponent';
import Tefo from '../tefo/Tefo';

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

  const history = useNavigate();

  const mutation = useMutation(async (formData: {newUsername: string, password: string}) => {
    const res = await axios.patch('http://localhost:8800/api/v1/user/change/username', formData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      Cookies.set('username', inputsValue.newUsername, { expires: 30 });
    }
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

    mutation.mutate(inputsValue);

    if (mutation.isSuccess && mutation.data) {
      history('/profile-settings')
    }
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
         text={mutation.isLoading ? <LoadingComponent style='circle' /> : 'Change Username'}
         bgColor='rgb(74 222 128)'
         color='white'
         borderRadius='10px'
         textSize='md'
         width='fit' 
        />
        {(mutation.isError && mutation.error instanceof AxiosError) ? (
          <Tefo isError message={mutation.error.response?.data.msg} />
        ) : null}
        {(mutation.isSuccess && mutation.data) ? (
          <Tefo isError={false} message={mutation.data.msg} />
        ) : null}
      </form>
    </SettingsItemHeader>
  )
}

export default ChangeUsername;