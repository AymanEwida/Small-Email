import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useMutation } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import { BiShow, BiHide } from 'react-icons/bi';

import {
  CenterComponent,
  SubTitleHeader,
  Input,
  Button,
  PasswordInstructionCard,
  Icon,
  LoadingComponent,
  Tefo
} from '../../components';

import {
  FormEvent,
  Event,
  InputElement
} from '../../types/types';

import noAvater from '../../assests/noAvatar.png';

import './register.css';

type FormData = {
  username : string;
  phoneNumber : string;
  email : string;
  password : string;
}

const Register: React.FC = () => {

  const [actions, setActions] = useState(['username', 'phoneNumber', 'email', 'password', 'passwordAgain', 'addImg']);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [inputsValue, setInputsValue] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    passwordAgain: '',
  });
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordAgainShow, setIsPasswordAgainShow] = useState(false);

  const history = useNavigate();

  function checkEmail (): boolean {
    for (const char of inputsValue.email) {
      if (char === '@') {
        return false;
      }
    }
    return true;
  }

  function handleNextAction (): void {
    if (actions[currentActionIndex] === 'username' && inputsValue.username.length === 0) {
      return;
    } else if (actions[currentActionIndex] === 'phoneNumber' && inputsValue.phoneNumber.length !== 10) {
      return;
    } else if (actions[currentActionIndex] === 'email' && (inputsValue.email.length === 0 || !checkEmail())) {
      return;
    } else if (actions[currentActionIndex] === 'password' && inputsValue.password.length === 0) {
      return;
    } else if (actions[currentActionIndex] === 'passwordAgain' && inputsValue.passwordAgain !== inputsValue.password) {
      return;
    }

    if (currentActionIndex+1 >= 0 && currentActionIndex+1 <= 5) {
      setCurrentActionIndex(prevActionIndex => prevActionIndex+1);
    }
  }

  function handleIsNextActionActive(): boolean {
    if (actions[currentActionIndex] === 'username' && inputsValue.username.length === 0) {
      return true;
    } else if (actions[currentActionIndex] === 'phoneNumber' && inputsValue.phoneNumber.length !== 10) {
      return true;
    } else if (actions[currentActionIndex] === 'email' && (inputsValue.email.length === 0 || !checkEmail())) {
      return true;
    } else if (actions[currentActionIndex] === 'password' && inputsValue.password.length === 0) {
      return true;
    } else if (actions[currentActionIndex] === 'passwordAgain' && inputsValue.passwordAgain !== inputsValue.password) {
      return true;
    } else {
      return false;
    }
  }

  function handlePreviousAction (): void {
    if (currentActionIndex-1 >= 0) {
      setCurrentActionIndex(prevActionIndex => prevActionIndex-1);
    }
  }

  function handleInputsValue (event: Event<InputElement>): void {
    setInputsValue(prevInputsValue => (
      {
        ...prevInputsValue,
        [event.target.name]: event.target.value,
      }
    ));
  }

  function handleShowPassword (): void {
    setIsPasswordShow(prevIsPasswordShow => !prevIsPasswordShow);
  }

  function handleShowPasswordAgain (): void {
    setIsPasswordAgainShow(prevIsPasswordAgainShow => !prevIsPasswordAgainShow);
  }

  const { isError, error, isLoading, mutate } = useMutation(async (formData: FormData) => {
    const res = await axios.post('http://localhost:8800/api/v1/auth/register', formData);
    return res.data;
  }, {
    onSuccess: (data) => {
      Cookies.set('token', data.token, { expires: 30 });
      Cookies.set('username', data.user.username, { expires: 30 });
      history('/');
      window.location.reload();
    }
  });

  function handleSubmit (event: FormEvent): void {
    event.preventDefault();

    const validEmail = inputsValue.email+"@smail.com";

    if (inputsValue.password === inputsValue.passwordAgain) {
      mutate({ username: inputsValue.username, email: validEmail, password: inputsValue.password, phoneNumber: inputsValue.phoneNumber });
    }
  }

  return (
    <div className='h-screen'>
      <CenterComponent addTextCenter={false}>
        <div className='text-center'>
          <SubTitleHeader
           subTitle='Create a Small Email account' 
          />
        </div>
        <h3 className='my-3 text-md text-gray-300 text-center'>
          {actions[currentActionIndex] === 'username' ? 
           'Enter your name' :
           actions[currentActionIndex] === 'phoneNumber' ?
           'Enetr your phone number' :
           actions[currentActionIndex] === 'email' ?
           'Enter your Small Email (do not right @ symbol)' :
           actions[currentActionIndex] === 'password' ?
           'Enetr your password(follow the instructions)' :
           actions[currentActionIndex] === 'passwordAgain' ?
           'Enetr your password again' :
           actions[currentActionIndex] === 'addImg' ?
           'Add a profile image(optional)' :
           ''
          }
        </h3>
        <form
         className='mt-8 flex flex-col gap-6'
         onSubmit={handleSubmit}
        >
          {actions[currentActionIndex] === 'username' ? (
            <Input
             id='username'
             label='Username'
             type='text'
             name='username'
             isRequired
             value={inputsValue.username}
             customFunc={handleInputsValue} 
            />
          ) : actions[currentActionIndex] === 'phoneNumber' ? (
            <div style={{ height: '53px' }} className='flex gap-2 items-center'>
              <select className='text-zinc-400 focus:outline-none bg-neutral-700 rounded-md h-full mb-0.5'>
                <option value="+972">+972</option>
                <option value="+31">+31</option>
              </select>
              <Input
               id='phoneNumber'
               label='Phone number'
               type='number'
               name='phoneNumber'
               isRequired
               value={inputsValue.phoneNumber}
               customFunc={handleInputsValue} 
              />
            </div>
          ) : actions[currentActionIndex] === 'email' ? (
            <div className='flex items-center gap-2'>
              <Input
               id='email'
               label='Email'
               type='text'
               name='email'
               isRequired
               value={inputsValue.email}
               customFunc={handleInputsValue} 
              />
              <span className='text-zinc-400'>
                @smail.com
              </span>
            </div>
          ) : actions[currentActionIndex] === 'password' ? (
            <>
              <div className='flex items-center gap-5'>
                <PasswordInstructionCard 
                 desc='Password must contain between 8 and 16 characters.'
                 isPass={() => inputsValue.password.length >= 8 && inputsValue.password.length <= 16}
                >
                  <h1 className='relative'>
                    8 <span className='absolute -top-0.5 -right-2.5 text-md'>+</span> 
                  </h1>
                  <span>
                    /
                  </span>
                  <h1 className='relative'>
                    16 <span className='absolute -top-0.5 -right-2.5 text-md'>-</span>
                  </h1>
                </PasswordInstructionCard>
                <PasswordInstructionCard 
                 desc='Password must contain at least one number.'
                 isPass={() => {
                  for (const char of inputsValue.password) {
                    if (char >= '0' && char <= '9') {
                      return true;
                    }
                  }
                  return false
                 }}
                >
                  <h1>
                    0 ... 9
                  </h1>
                </PasswordInstructionCard>
                <PasswordInstructionCard 
                 desc='Password must contain both small and big characters.'
                 isPass={() => (
                    (() => {
                      for (const char of inputsValue.password) {
                        if (char >= 'a' && char <= 'z') {
                          return true;
                        }
                      }
                      return false;
                    })() && (() => {
                      for (const char of inputsValue.password) {
                        if (char >= 'A' && char <= 'Z') {
                          return true;
                        }
                      }
                      return false;
                    })() 
                  )}
                >
                  <h1>
                    a & A
                  </h1>
                </PasswordInstructionCard>
                <PasswordInstructionCard 
                desc='Password must contain one of these symbols.'
                isPass={() => {
                  for (const char of inputsValue.password) {
                    if (char === '@' || char === '#' || char === '$' || char === '%' || char === '&' || char === '*' || char === '(' || char === ')') {
                      return true;
                    }
                  }
                  return false;
                }}
                >
                  <h1 className='text-2xl'>
                    @ # $ % & * {'('} {')'}
                  </h1>
                </PasswordInstructionCard>
              </div>
              <div className='flex items-center gap-3'>
                <span className='w-500'>
                  <Input
                   id='password'
                   label='Password'
                   type={isPasswordShow ? 'text' : 'password'}
                   name='password'
                   isRequired
                   value={inputsValue.password}
                   customFunc={handleInputsValue} 
                  />
                </span>
                <Icon
                 title={`${isPasswordShow ? 'Hide' : 'Show'} Password`}
                 iconPosition='bottom'
                 icon={isPasswordShow ? <BiHide /> : <BiShow />}
                 color='white'
                 bgColor='bg-gray-700'
                 customFunc={handleShowPassword}
                />
              </div>
            </>
          ) : actions[currentActionIndex] === 'passwordAgain' ? (
            <div className='flex items-center gap-3'>
              <Input
               id='passwordAgain'
               label='Password Again'
               type={isPasswordAgainShow ? 'text' : 'password'}
               name='passwordAgain'
               isRequired
               value={inputsValue.passwordAgain}
               customFunc={handleInputsValue} 
              />
              <Icon
               title={`${isPasswordAgainShow ? 'Hide' : 'Show'} Password`}
               iconPosition='bottom'
               icon={isPasswordAgainShow ? <BiHide /> : <BiShow />}
               color='white'
               bgColor='bg-gray-700'
               customFunc={handleShowPasswordAgain}
              />
            </div>
          ) : actions[currentActionIndex] === 'addImg' ? (
            <>
              <img
               className='h-32 w-32 m-auto rounded-full' 
               src={noAvater} 
               alt="profile image" 
              />
              <input
               type="file"
               className='cursor-pointer' 
              />
            </>
          ) : null}
          <div className={currentActionIndex === 0 ? 'text-right' : 'flex items-center justify-between'}>
            {currentActionIndex > 0 && currentActionIndex <= 5 ? (
              <Button
               type='button'
               bgColor='rgb(96 165 250)'
               color='white'
               text={isLoading ? <LoadingComponent style='circle' /> : 'Previous'}
               paddingSize='2'
               borderRadius='10px'
               textSize='md'
               isDisabled={isLoading}
               customFunc={handlePreviousAction}
              />
            ) : null}
            {currentActionIndex !== 5 ? (
              <Button
               type='button'
               bgColor='rgb(96 165 250)'
               color='white'
               text={isLoading ? <LoadingComponent style='circle' /> : 'Next'}
               paddingSize='2'
               borderRadius='10px'
               textSize='md'
               isDisabled={isLoading || handleIsNextActionActive()}
               customFunc={handleNextAction}
              />
            ) : null}
          </div>
          {currentActionIndex === 5 ? (
            <Button
             type='submit'
             bgColor='rgb(74 222 128)'
             color='white'
             text={isLoading ? <LoadingComponent style='circle' /> :'Create account'}
             paddingSize='2'
             borderRadius='10px'
             textSize='md'
             width='full'
             isDisabled={isLoading}
            />
          ) : null}
        </form>
        <p className='text-gray-400 text-md mt-8'>
          already have an account? <Link to='/choose-account'><span className='text-blue-400 hover:underline'>Sing in</span></Link>
        </p>
      </CenterComponent>
      {isError && (error instanceof AxiosError) ? (
        <Tefo 
         isError
         message={error.response?.data.msg} 
        />
      ) : null}
    </div>
  )
}

export default Register;