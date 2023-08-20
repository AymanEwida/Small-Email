import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';

import { AiFillDelete } from 'react-icons/ai';

import Icon from '../icon/Icon';

import { Event, InputElement, Void } from '../../types/types';

import './email-component.css';

interface EmailComponentProps {
  sender ?: string,
  sendTo ?: {_id : string, username ?: string, groupName ?: string}[],
  subject : string,
  sendAt : string,
  content : string,
  emailID ?: string,
  category ?: string
  handleDeleteEmail ?: Void;
  isEmailChecked ?: boolean,
  handleEmailChecked ?: Void,
}

const EmailComponent: React.FC<EmailComponentProps> = ({ sender, sendTo, subject, sendAt, content, emailID, category, handleDeleteEmail, isEmailChecked, handleEmailChecked }) => {

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
          {sender ? (
            <h2 className='font-bold text-green-400 w-20'>
              {sender === Cookies.get('username') ? "Me" : sender}
            </h2>
          ) : null}
          {sendTo ? (
            <div className='flex flex-row items-center gap-2 overflow-x-auto text-ellipsis whitespace-nowrap w-44'>
              {sendTo.map((recipient, index) => (
                <h2 key={recipient._id} className='font-bold text-green-400'>
                  {recipient.username && recipient.username === Cookies.get('username') ? "Me" : recipient.username || recipient.groupName} {recipient.groupName ? '(group)' : ''} {index === sendTo.length - 1 ? '' : ','}
                </h2>
              ))}
            </div>
          ) : null}
        </div>
        <Link to={`/${category}/email?e_id=${emailID}`}>
          <p className='text-gray-300 text-clip w-96 overflow-hidden ml-2'>
            {subject}
          </p>
        </Link>
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
      <Link to={`/${category}/email?e_id=${emailID}`}>
        <p className='overflow-hidden text-ellipsis whitespace-nowrap w-96 text-gray-200'>
          {content}
        </p>
      </Link>
    </div>
  )
}

export default EmailComponent;