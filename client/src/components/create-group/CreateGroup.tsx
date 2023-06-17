import React, { useState } from 'react';

import { IoMdCloseCircle } from 'react-icons/io';

import Icon from '../icon/Icon';
import Input from '../input/Input';

import { 
  Event,
  InputElement,
  Void
 } from '../../types/types';

import './create-group.css';

interface CreateGroupProps {
  closeFunc : Void,
}

const CreateGroup: React.FC<CreateGroupProps> = ({ closeFunc }) => {
  
  const [groupName, setGroupName] = useState('');

  function handleChange (event: Event<InputElement>): void {
    setGroupName(event.target.value);
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='absolute top-24 bg-black rounded-md overflow-hidden w-400'>
        <div className='w-full sticky top-0 bg-secondary-dark-bg p-3 flex justify-between items-center z-index'>
          <h1 className='font-bold text-sm'>
            Create New Group
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
        <div className='p-3 flex flex-col gap-3'>
          <Input
           type='text'
           id='groupName'
           label='Group Name'
           value={groupName}
           customFunc={handleChange}
          />
          <Input
           type='text'
           id='groupEmail'
           label='Group Email'
           value={groupName}
           customFunc={handleChange}
          />          
          <Input
          type='text'
          id='groupDesc'
          label='Group Desc(optional)'
          value={groupName}
          customFunc={handleChange}
         />
          <Input
          type='text'
          id='participants'
          label='Participants'
          value={groupName}
          customFunc={handleChange}
         />
        </div>
      </div>
    </div>
  )
}

export default CreateGroup;