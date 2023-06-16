import React, { useState } from 'react';

import { AiFillDelete } from 'react-icons/ai';

import Icon from '../icon/Icon';

import { Void } from '../../types/types';

import './email-component.css';

interface EmailComponentProps {
  isEmailChecked : boolean,
  handleEmailChecked : Void,
}

const EmailComponent: React.FC<EmailComponentProps> = ({ isEmailChecked, handleEmailChecked }) => {

  let timeout: NodeJS.Timeout;

  const [isShow, setIsShow] = useState(false);

  function handleShow (): void {
    timeout = setTimeout(() => {
      setIsShow(true);
    }, 300);
  }

  function handleDisShow (): void {
    clearInterval(timeout);
    setIsShow(false);
  }

  return (
    <div 
     className='bg-black w-full py-2 px-9 lg:px-12 hover:scale-105 transition duration-300 text-md hover:drop-shadow-lg'
     onMouseEnter={handleShow}
     onMouseLeave={handleDisShow}
    >
      <div className='flex justify-between items-center pb-1 border-b-1 w-full border-inherit px-7'>
        <div className='flex items-center gap-3'>
          <input 
           type="checkbox"
           className=' cursor-pointer text-md'
           checked={isEmailChecked}
           onChange={handleEmailChecked} 
          />
          <h2 className='font-bold text-green-400'>
            Jhon_Doe
          </h2>
        </div>
        <p className='text-gray-300 text-clip w-96 overflow-hidden ml-2'>
          WelcomeWelcomeWelcomeWelcomeWelcomeWelcome
        </p>
        {!isShow ? (
          <p className='text-sm text-gray-400 ml-3 whitespace-nowrap hide-animation'>
            3 May
          </p>
        ) : null}
        {isShow ? (
          <span className='show-animation'>
            <Icon
              title='Delete Email'
              iconPosition='bottom'
              bgColor='bg-gray-700'
              color='white'
              icon={<AiFillDelete />}
              customFunc={() => console.log('I want to delete this email!!')} 
            />
          </span>
        ): null}
      </div>
      <p className='overflow-hidden text-ellipsis whitespace-nowrap w-96 text-gray-200'>
        Hi Jan Doe, how are you?  
        Hi Jan Doe, how are you?  
        Hi Jan Doe, how are you?  
        Hi Jan Doe, how are you?
      </p>
    </div>
  )
}

export default EmailComponent;