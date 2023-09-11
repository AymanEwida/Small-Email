import React from 'react';

import noAvatar from '../../assests/noAvatar.png';

import { User } from '../../types/types';

import './found-users.css';

interface FoundUsersProps {
  users: User[],
  addFunc : (index: number) => void,
}

const FoundUsers: React.FC<FoundUsersProps> = ({ users, addFunc }) => {
  return (
    <div className='mt-2 bg-black rounded-md overflow-y-auto h-72'>
      {users.map((user: any, index: number) => (
        <div key={user._id} onClick={() => addFunc(index)} className='flex items-center gap-5 border-b-1 border-inherit hover:bg-hover-bg w-full cursor-pointer p-4'>
          <img
           className='h-10 w-10 rounded-full object-cover' 
           src={user.userImg ? user.userImg : noAvatar} 
           alt="profile image" 
          />
          <div>
            <h1 className='font-bold text-gray-300'>
              {user.username} <span className='font-semibold text-gray-500'>{"<"}{user.email}{">"}</span>
            </h1>
            <p className='text-gray-700'>
              {user.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoundUsers;