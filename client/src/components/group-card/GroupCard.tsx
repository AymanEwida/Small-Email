import React from 'react';

import noGroupAvatar from '../../assests/noGroupAvatar.png';

import './group-card.css';

interface GroupCardProps {
  name : string,
  email : string,
}

const GroupCard: React.FC <GroupCardProps> = ({ name, email }) => {
  return (
    <div className='w-fit bg-zinc-800 rounded-md p-3 cursor-pointer hover:bg-gray-700'>
      <div className='flex items-center gap-3 border-inherit border-b-1 pb-3 w-full'>
        <img
         className='rounded-full object-cover h-10 w-10 bg-white' 
         src={noGroupAvatar} 
         alt="group img" 
        />
        <span className='font-semibold text-md text-gray-200'>
          {name}
        </span>
      </div>
      <p className='mt-2 text-gray-300 text-sm text-center'>
        {email}
      </p>
    </div>
  )
}

export default GroupCard;