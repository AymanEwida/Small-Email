import React from 'react';

import { Link } from 'react-router-dom';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';

import Icon from '../icon/Icon';
import Button from '../button/Button';
import ClipboardCopy from '../clipboard-copy/ClipboardCopy';

import noGroupAvatar from '../../assests/noGroupAvatar.png';

import { Void, Optional } from '../../types/types';

import './groups-navbar.css';

interface GroupsNavbarProps {
  category : Optional<string>,
  groupID : Optional<string>,
  groupImg : string
  groupName : string,
  groupEmail : string,
  numberOfEmail ?: number,
  isEmailsChecked ?: boolean,
  handleEmailsChecked ?: Void,
  toggleFunc ?: Void,
  openSettingsMenuFunc ?: Void,
  refreshEmails ?: Void,
  handleDeleteEmails ?: Void,
}

const GroupsNavbar: React.FC<GroupsNavbarProps> = ({ category, groupID, groupImg, groupName, groupEmail, numberOfEmail, isEmailsChecked, handleEmailsChecked, toggleFunc, openSettingsMenuFunc, refreshEmails, handleDeleteEmails }) => {
  return (
    <div className='sticky bg-secondary-dark-bg top-0 w-full py-3 px-8 z-20'>
      <div className='flex justify-between border-b-1 pb-3 color-border'>
        <Link to='/groups'>
          <Icon
           title='Go Back'
           iconPosition='bottom'
           color='white'
           icon={<AiOutlineArrowLeft />}
           textSize='md'
           bgColor='bg-gray-400' 
          />
        </Link>
        <div className='flex flex-col gap-1 items-center'>
          <img
           className='h-10 w-10 rounded-full object-cover bg-white' 
           src={noGroupAvatar} 
           alt="group img" 
          />
          <h2 className='font-bold text-lg'>
            {groupName} - <span className='font-light text-gray-400'>{category && category === 'conversation' ? 'Chat' : 'Emails'}</span>
          </h2>
          <h3 className='font-semibold text-sm my-1'>
            <ClipboardCopy copyText={groupEmail} />
          </h3>
          <Link to={`/groups/${category && category === 'conversation' ? 'enails' : 'conversation'}?g_id=${groupID}`}>
            <Button
             type='button'
             bgColor='rgb(74 222 128)'
             text={`Open Group's ${category && category === 'conversation' ? 'Emails' : 'Chat'}`}
             textSize='md'
             borderRadius='10px'
             paddingSize='1'
             color='white'
             customFunc={toggleFunc} 
            />
          </Link>
        </div>
        {numberOfEmail ? <p className='text-gray-400'>
          {numberOfEmail} emails
        </p> : null}
      </div>
      <div className='flex justify-between items-center mt-2.5'>
        <div className='grid grid-cols-2 gap-2'>
          <div className={`flex gap-3 items-center border-r-2 pr-${isEmailsChecked || category === 'conversation' ? '2' : '4'} b-color`}>
            <Icon
             title='Refresh'
             iconPosition='bottom'
             color='white'
             bgColor='bg-gray-400'
             animation='hover:rotate-90 transform duration-200'
             icon={<IoMdRefresh />}
             customFunc={refreshEmails} 
            />
            {category === 'emails' ? (
              <input 
               type="checkbox"
               checked={isEmailsChecked}
               className={`cursor-pointer ${!isEmailsChecked ? 'mr-4' : ''}`}
               onChange={handleEmailsChecked} 
              />
            ) : null}
            {isEmailsChecked && category === 'emails' ? (
              <Icon
               title='Delete Emails'
               iconPosition='bottom'
               color='white'
               bgColor='bg-gray-400'
               icon={<MdDelete />}
               customFunc={handleDeleteEmails} 
              />
            ) : null}
          </div>
          <Icon
           title='Group Settings'
           iconPosition='bottom'
           icon={<FiSettings />}
           color='white'
           bgColor='bg-gray-400'
           textSize='md'
           animation='hover:rotate-45 transform duration-150'
           customFunc={openSettingsMenuFunc}
          />
        </div>
        {category === 'emails' ? (
          <div>
            <select className='text-black rounded-md focus:outline-none cursor-pointer'>
              <option> 
                Newer
              </option>
              <option>
                Older
              </option>
            </select>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default GroupsNavbar;