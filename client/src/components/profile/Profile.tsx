import React from 'react';

import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';

import { AiOutlineUserAdd } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';

import noAvater from '../../assests/noAvatar.png';

import { dummyData } from './dummyData';

import './profile.css';

const Profile: React.FC = () => {
  
  function handleLogot (): void {
    Cookies.remove('token');
    Cookies.remove('username');
    window.location.reload();
  }

  return (
    <div className='absolute top-[70px] right-3 bg-secondary-dark-bg p-5 w-96 rounded-lg z-index'>
      <div className='flex gap-5 items-center border-color border-b-1 pb-4 w-full'>
        <img
         className='rounded-full object-cover h-20 w-20' 
         src={noAvater}
         alt="profile" 
        />
        <div className='h-20'>
          <h2 className='text-xl font-bold text-green-400'>
            Jan Doe
          </h2>
          <p className='text-sm text-gray-400 mb-2'>
            jan@smail.com
          </p>
          <Link to='/profile-settings'>
            <span className='bg-blue-500 text-sm rounded-md p-1 hover:drop-shadow-md'>
              Manage your account
            </span>
          </Link>
        </div>
      </div>
      <div className='overflow-y-auto h-[220px]'>
        {dummyData.map((dummy, index) =>(
          <div key={index} className='flex gap-10 cursor-pointer hover:bg-hover-bg p-4 border-inherit border-b-1 w-full px-3'>
            <img
            className='rounded-full object-cover h-8 w-8' 
            src={noAvater} 
            alt="account" 
            />
            <div className='text-sm'>
              <h3 className='text-[16px] font-medium text-blue-500'>
                {dummy.name}
              </h3>
              <p className='text-gray-400'>
                {dummy.email}
              </p>
            </div>
            <span className='text-sm text-gray-300'>
              {dummy.stauts}
            </span>
          </div>
        ))}
      </div>
      <div className='border-color border-b-1 w-full py-3'>
        <Link to='/choose-account'>
          <div className='flex gap-3 items-center m-auto bg-black w-fit p-1 px-2 rounded-md hover:drop-shadow-md'>
            <span className='text-2xl text-green-500'>
              <AiOutlineUserAdd />
            </span>
            <p className='font-light text-gray-300'>
              Add new account
            </p>
          </div>
        </Link>
      </div>
      <button
       type='button' 
       className='mt-2 flex gap-4 items-center w-full justify-center bg-red-500 rounded-full p-2 hover:drop-shadow-md'
       onClick={handleLogot}
      >
        <span className='text-2xl text-color'>
          <IoLogOutOutline />
        </span>
        Log Out
      </button>
    </div>
  )
}

export default Profile;