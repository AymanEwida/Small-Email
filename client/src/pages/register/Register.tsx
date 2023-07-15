import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { BiPlus } from 'react-icons/bi';

import {
  CenterComponent,
  SubTitleHeader,
  Input,
  Button,
  PasswordInstructionCard
} from '../../components';

import {
  FormEvent,
  Event,
  InputElement
} from '../../types/types';

import noAvater from '../../assests/noAvatar.png';

import './register.css';

const Register: React.FC = () => {

  const [actions, setActions] = useState(['username', 'phoneNumber', 'email', 'password', 'addImg']);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [username, setUsername] = useState('');

  function handleNextAction (): void {
    if (currentActionIndex+1 >= 0 && currentActionIndex+1 <= 4) {
      setCurrentActionIndex(prevActionIndex => prevActionIndex+1);
    }
  }

  function handlePreviousAction (): void {
    if (currentActionIndex-1 >= 0) {
      setCurrentActionIndex(prevActionIndex => prevActionIndex-1);
    }
  }

  function handleUsername (event: Event<InputElement>): void {
    setUsername(event.target.value);
  }

  function handleSubmit (event: FormEvent): void {
    event.preventDefault();

    console.log('I submited wow!');
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
           'Enter your Small Email' :
           actions[currentActionIndex] === 'password' ?
           'Enetr your password(follow the instructions)' :
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
             value={username}
             customFunc={handleUsername} 
            />
          ) : actions[currentActionIndex] === 'phoneNumber' ? (
            <Input
             id='phoneNumber'
             label='Phone number'
             type='text'
             value={username}
             customFunc={handleUsername} 
            />
          ) : actions[currentActionIndex] === 'email' ? (
            <Input
             id='email'
             label='Email'
             type='text'
             value={username}
             customFunc={handleUsername} 
            />
          ) : actions[currentActionIndex] === 'password' ? (
            <>
              <div className='flex items-center gap-5'>
                <PasswordInstructionCard 
                 desc='Password must contain between 8 and 16 characters.'
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
                >
                  <h1>
                    0 ... 9
                  </h1>
                </PasswordInstructionCard>
                <PasswordInstructionCard 
                 desc='Password must contain both small and big characters.'
                >
                  <h1>
                    a & A
                  </h1>
                </PasswordInstructionCard>
                <PasswordInstructionCard 
                desc='Password must contain one of these symbols.'
                >
                  <h1 className='w-48'>
                    @ # $ % & * {'('} {')'}
                  </h1>
                </PasswordInstructionCard>
              </div>
              <Input
               id='password'
               label='Password'
               type='password'
               value={username}
               customFunc={handleUsername} 
              />
            </>
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
            {currentActionIndex > 0 && currentActionIndex <= 4 ? (
              <Button
               type='button'
               bgColor='rgb(96 165 250)'
               color='white'
               text='Previous'
               paddingSize='2'
               borderRadius='10px'
               textSize='md'
               customFunc={handlePreviousAction}
              />
            ) : null}
            {currentActionIndex !== 4 ? (
              <Button
               type='button'
               bgColor='rgb(96 165 250)'
               color='white'
               text='Next'
               paddingSize='2'
               borderRadius='10px'
               textSize='md'
               customFunc={handleNextAction}
              />
            ) : null}
          </div>
          {currentActionIndex === 4 ? (
            <Button
             type='submit'
             bgColor='rgb(74 222 128)'
             color='white'
             text='Create account'
             paddingSize='2'
             borderRadius='10px'
             textSize='md'
             width='full'
             customFunc={handleNextAction}
            />
          ) : null}
        </form>
        <p className='text-gray-400 text-md mt-8'>
          already have an account? <Link to='/choose-account'><span className='text-blue-400 hover:underline'>Sing in</span></Link>
        </p>
      </CenterComponent>
    </div>
  )
}

export default Register;