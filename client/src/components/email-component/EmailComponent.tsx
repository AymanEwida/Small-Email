import React, { useState } from 'react';

import Cookies from 'js-cookie';

import { AiFillDelete } from 'react-icons/ai';

import Icon from '../icon/Icon';

import { Event, InputElement, Void } from '../../types/types';

import './email-component.css';

interface EmailComponentProps {
  sender : string,
  subject : string,
  sendAt : string,
  content : string,
  handleDeleteEmail ?: Void;
  isEmailChecked ?: boolean,
  handleEmailChecked ?: Void,
}

const EmailComponent: React.FC<EmailComponentProps> = ({ sender, subject, sendAt, content, handleDeleteEmail, isEmailChecked, handleEmailChecked }) => {

  let timeout: NodeJS.Timeout;

  const [isShow, setIsShow] = useState(false);

  function handleShow (): void {
    timeout = setTimeout(() => {
      setIsShow(true);
    }, 700);
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
          <h2 className='font-bold text-green-400 w-20'>
            {sender === Cookies.get('username') ? "Me" : sender}
          </h2>
        </div>
        <p className='text-gray-300 text-clip w-96 overflow-hidden ml-2'>
          {subject}
        </p>
        {!isShow ? (
          <p className='text-sm text-gray-400 ml-3 whitespace-nowrap'>
            {sendAt}
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
              customFunc={handleDeleteEmail} 
            />
          </span>
        ): null}
      </div>
      <p className='overflow-hidden text-ellipsis whitespace-nowrap w-96 text-gray-200'>
        {content}
      </p>
    </div>
  )
}

export default EmailComponent;