import React from 'react';

import { useQuery } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import LoadingComponent from '../loading-component/LoadingComponent';
import Tefo from '../tefo/Tefo';

import noAvatar from '../../assests/noAvatar.png';

import './found-users.css';

interface FoundUsersProps {
  email: string
}

const FoundUsers: React.FC<FoundUsersProps> = ({ email }) => {
  const {isError, error, isLoading, isSuccess, data} = useQuery(['searchByEmail', email], async () => {
    const res = await axios.get(`http://localhost:8800/api/v1/user/search?email=${email}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data
  }, {
    enabled: email.length > 0
  });

  if (isLoading) {
    return (
      <div className='mt-2 bg-black rounded-md text-center'>
        <LoadingComponent style='text' />
      </div>
    );
  }

  if (isError && (error instanceof AxiosError)) {
    return (
      <Tefo isError message={error.response?.data.msg} />
    );
  }

  if(data) {
  return (
    <div className='mt-2 bg-black rounded-md overflow-y-auto h-72'>
      {data.users.map((user: any) => (
        <div key={user._id} className='flex items-center gap-5 border-b-1 border-inherit hover:bg-hover-bg w-full cursor-pointer p-4'>
          <img
           className='h-10 w-10 rounded-full object-cover' 
           src={noAvatar} 
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
  )
  }

  return <></>
}

export default FoundUsers;