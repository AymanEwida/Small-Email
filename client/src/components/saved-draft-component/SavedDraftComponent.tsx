import React, { useState } from 'react';

import Cookies from 'js-cookie';

import { AiFillDelete } from 'react-icons/ai';

import parse from 'html-react-parser';

import Icon from '../icon/Icon';

import { Void } from '../../types/types';

import './saved-draft-component.css';

interface SavedDraftComponentProps {
  sendTo ?: {_id : string, username ?: string, groupName ?: string}[],
  subject : string,
  updatedAt : string,
  content : string,
  handleDeleteEmail ?: Void;
  isEmailChecked ?: boolean,
  handleEmailChecked ?: Void,
  onClick : Void,
}

const SavedDraftComponent: React.FC<SavedDraftComponentProps> = ({ sendTo, subject, updatedAt, content, handleDeleteEmail, isEmailChecked, handleEmailChecked, onClick }) => {

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
          {sendTo ? (
            <div onClick={onClick} className='flex flex-row items-center gap-2 cursor-pointer overflow-x-auto text-ellipsis whitespace-nowrap w-44'>
              {sendTo.map((recipient, index) => (
                <h2 key={recipient._id} className='font-bold text-green-400'>
                  {recipient.username && recipient.username === Cookies.get('username') ? "Me" : recipient.username || recipient.groupName} {recipient.groupName ? '(group)' : ''} {index === sendTo.length - 1 ? '' : ','}
                </h2>
              ))}
            </div>
          ) : null}
        </div>
        <p onClick={onClick} className='text-gray-300 text-clip cursor-pointer w-96 overflow-hidden ml-2'>
          {subject}
        </p>
        {!isShow ? (
          <p className='text-sm text-gray-400 ml-3 whitespace-nowrap'>
            {updatedAt}
          </p>
        ) : null}
        {isShow ? (
          <span className='show-animation'>
            <Icon
              title='Delete Draft'
              iconPosition='bottom'
              bgColor='bg-gray-700'
              color='white'
              icon={<AiFillDelete />}
              customFunc={handleDeleteEmail} 
            />
          </span>
        ): null}
      </div>
      <p onClick={onClick} className='overflow-hidden cursor-pointer text-ellipsis whitespace-nowrap w-96 text-gray-200'>
        {parse(content)}
      </p>
    </div>
  )
}

export default SavedDraftComponent;