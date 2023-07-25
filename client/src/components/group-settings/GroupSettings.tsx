import React from 'react';

import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';

import { IoMdCloseCircle } from 'react-icons/io';
import { BsFillPencilFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { AiFillDelete } from 'react-icons/ai';

import Icon from '../icon/Icon';
import Button from '../button/Button';
import ClipboardCopy from '../clipboard-copy/ClipboardCopy';

import noGroupAvatar from '../../assests/noGroupAvatar.png';
import noAvater from '../../assests/noAvatar.png';

import { Void, Optional } from '../../types/types';

import './group-settings.css';

type GroupParticipate = {
  participateID : string;
  isAdmin : boolean;
  _id : string;
  user : {_id: string, username: string, email: string, userImg: string};
}

interface GroupSettingsProps {
  category : Optional<string>,
  isCurrentUserAdmin : boolean,
  groupID : Optional<string>,
  groupName : string,
  groupEmail : string,
  groupDesc : string,
  groupParticipates : GroupParticipate[],
  closeFunc : Void,
  toggleFunc : Void
}

const GroupSettings: React.FC<GroupSettingsProps> = ({ category, isCurrentUserAdmin, groupID, groupName, groupEmail, groupDesc, groupParticipates, closeFunc, toggleFunc }) => {
  return (
    <div className='sticky bottom-0 left-0 z-index h-full bg-[#42464D] py-5 px-4 w-80'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-sm'>
          Group Settings
        </h1>
        <Icon
         title='Close'
         iconPosition='bottom'
         color='white'
         bgColor='bg-gray-400'
         icon={<IoMdCloseCircle />}
         textSize='md'
         customFunc={closeFunc} 
        />
      </div>
      <div className='mt-4 border-color border-b-1 pb-4 '>
        <div className='flex gap-6 mb-4'>
          <div className='relative'>
            <img 
             className='rounded-full object-cover h-10 w-10 bg-white'
             src={noGroupAvatar} 
             alt="group img" 
            />
            {isCurrentUserAdmin ? <span className='absolute -top-3 -right-3 cursor-pointer'>
              <Icon
               title='Eide Image'
               iconPosition='right'
               color='rgb(209 213 219)'
               bgColor='bg-gray-500'
               icon={<BsFillPencilFill />}
               textSize='sm'
               customFunc={() => console.log('I want to change the group img!')} 
              />
            </span> : null}
          </div>
          <div className=''>
            <h2 className='text-xl font-bold mb-1'>
              {groupName}
            </h2>
            {isCurrentUserAdmin ? <Button
             type='button'
             text="change group's name"
             bgColor='rgb(94 234 212)'
             paddingSize='1'
             textSize='sm'
             color='white'
             borderRadius='5px'
             customFunc={() => console.log('I want to change the group name!')} 
            /> : null }
            <p className='text-sm my-2'>
              <ClipboardCopy copyText={groupEmail} />
            </p>
            {isCurrentUserAdmin ? <Button
             type='button'
             text="change group's email"
             bgColor='rgb(94 234 212)'
             paddingSize='1'
             textSize='sm'
             color='white'
             borderRadius='5px'
             customFunc={() => console.log('I want to change the group email!')} 
            /> : null }
          </div>
        </div>
        <Link to={`/groups/${category && category === 'conversation' ? 'enails' : 'conversation'}?g_id=${groupID}`}>
          <Button
           type='button'
           bgColor='rgb(74 222 128)'
           text={`Open Group's ${category && category === 'conversation' ? 'Emails' : 'Chat'}`}
           textSize='md'
           borderRadius='10px'
           paddingSize='1'
           width='100%'
           color='white'
           customFunc={toggleFunc} 
          />
        </Link>
      </div>
      <p className='text-gray-300 text-sm text-center border-color border-b-1 py-4'>
        {groupDesc}
      </p>
      <div className='p-2'>
        <h2 className='text-center text-gray-200 text-lg underline font-semibold mb-2'> 
          Participates Users
        </h2>
        {isCurrentUserAdmin ? <Button
         type='button'
         bgColor='rgb(94 234 212)'
         text='Add new participates'
         textSize='md'
         borderRadius='10px'
         paddingSize='1'
         width='100%'
         color='white'
         customFunc={() => console.log('I want to add new Participates')} 
        /> : null}
        <div className='overflow-y-auto h-96'>
          {groupParticipates.map((participate) => (
            <div key={participate._id} className='border-color border-b-1 py-4 w-full'>
              <div className='flex gap-2 items-center'>
                <img
                 className='h-8 w-8 rounded-full object-cover' 
                 src={noAvater} 
                 alt="profile image" 
                />
                {Cookies.get('username') === participate.user.username ? (
                  <p className='text-gray-100 font-medium'>
                    Me
                  </p>
                ) : (
                <p className='text-gray-100 font-medium'>
                  {participate.user.username} <span className='text-gray-300 font-light'>{'<'}{participate.user.email}{'>'}</span>
                </p>
                )}
              </div>
              {participate.isAdmin ? <p className='text-gray-400 my-2 text-center font-medium'>
                status: <span className='text-gray-200 font-semibold'>Admin</span>
              </p> : null}
              {isCurrentUserAdmin && Cookies.get('username') !== participate.user.username ? <div className='mt-2 flex gap-2 justify-center items-center'>
                <Button
                type='button'
                bgColor='rgb(248 113 113)'
                text='Remove'
                textSize='md'
                borderRadius='5px'
                paddingSize='1'
                color='white'
                customFunc={() => console.log('I want to remove the group participate!')} 
                />
                <Button
                type='button'
                bgColor='rgb(94 234 212)'
                text='Make Admin'
                textSize='md'
                borderRadius='5px'
                paddingSize='1'
                color='white'
                customFunc={() => console.log('I want to change the group participate!')} 
                />
              </div> : null }   
            </div>
          ))}
          {isCurrentUserAdmin ? <div className='mt-2'><Button
           type='button'
           bgColor='rgb(94 234 212)'
           text='Add new participates'
           textSize='md'
           borderRadius='10px'
           paddingSize='1'
           color='white'
           customFunc={() => console.log('I want to add new Participates')} 
          /></div> : null}
        </div>
      </div>
      <span className='absolute bottom-2 left-10'>
        <Icon
         title='Leave Group'
         iconPosition='top'
         color='white'
         bgColor='bg-gray-500'
         icon={<ImExit />}
         textSize='md' 
        />
      </span>
      {isCurrentUserAdmin ? <span className='absolute bottom-2 right-10'>
        <Icon
         title='Delete Group'
         iconPosition='top'
         color='white'
         bgColor='bg-gray-500'
         icon={<AiFillDelete />}
         textSize='md' 
        />
      </span> : null}
    </div>
  )
}

export default GroupSettings;