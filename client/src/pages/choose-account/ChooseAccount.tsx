import React from 'react'

import { Link } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';

import {
  CenterComponent,
  SubTitleHeader
} from '../../components';

import noAvater from '../../assests/noAvatar.png';

import './choose-account.css';

const ChooseAccount: React.FC = () => {
  return (
    <div className='h-screen'>
      <CenterComponent>
        <SubTitleHeader
         subTitle='Choose an account' 
        />
        <div className='mt-4 w-full overflow-y-auto h-72 snap-mandatory snap-y'>
          <div className='flex items-center gap-24 w-full p-4 border-inherit border-b-1 cursor-pointer hover:bg-hover-bg snap-center'> 
            <div className='flex gap-4'>
              <img
               className='h-8 w-8 object-cover rounded-full' 
               src={noAvater} 
               alt="profile img" 
              />
              <div className='text-sm text-left'>
                <h3 className='font-medium text-[16px]'>
                  Jan Doe
                </h3>
                <p className='text-gray-400'>
                  jan@smail.com
                </p>
              </div>
            </div>
            <p className='text-red-700'>
              disconnect
            </p>
          </div>
          <div className='flex items-center gap-24 w-full p-4 border-inherit border-b-1 cursor-pointer hover:bg-hover-bg snap-center'> 
            <div className='flex gap-4'>
              <img
               className='h-8 w-8 object-cover rounded-full' 
               src={noAvater} 
               alt="profile img" 
              />
              <div className='text-sm text-left'>
                <h3 className='font-medium text-[16px]'>
                  Jan Doe
                </h3>
                <p className='text-gray-400'>
                  jan@smail.com
                </p>
              </div>
            </div>
            <p className='text-red-700'>
              disconnect
            </p>
          </div>
          <div className='flex items-center gap-24 w-full p-4 border-inherit border-b-1 cursor-pointer hover:bg-hover-bg snap-center'> 
            <div className='flex gap-4'>
              <img
               className='h-8 w-8 object-cover rounded-full' 
               src={noAvater} 
               alt="profile img" 
              />
              <div className='text-sm text-left'>
                <h3 className='font-medium text-[16px]'>
                  Jan Doe
                </h3>
                <p className='text-gray-400'>
                  jan@smail.com
                </p>
              </div>
            </div>
            <p className='text-red-700'>
              disconnect
            </p>
          </div>
          <div className='flex items-center gap-24 w-full p-4 border-inherit border-b-1 cursor-pointer hover:bg-hover-bg snap-center'> 
            <div className='flex gap-4'>
              <img
               className='h-8 w-8 object-cover rounded-full' 
               src={noAvater} 
               alt="profile img" 
              />
              <div className='text-sm text-left'>
                <h3 className='font-medium text-[16px]'>
                  Jan Doe
                </h3>
                <p className='text-gray-400'>
                  jan@smail.com
                </p>
              </div>
            </div>
            <p className='text-red-700'>
              disconnect
            </p>
          </div>
          <div className='flex items-center gap-24 w-full p-4 border-inherit border-b-1 cursor-pointer hover:bg-hover-bg snap-center'> 
            <div className='flex gap-4'>
              <img
               className='h-8 w-8 object-cover rounded-full' 
               src={noAvater} 
               alt="profile img" 
              />
              <div className='text-sm text-left'>
                <h3 className='font-medium text-[16px]'>
                  Jan Doe
                </h3>
                <p className='text-gray-400'>
                  jan@smail.com
                </p>
              </div>
            </div>
            <p className='text-red-700'>
              disconnect
            </p>
          </div>
          <div className='flex items-center gap-24 w-full p-4 border-inherit border-b-1 cursor-pointer hover:bg-hover-bg snap-center'> 
            <div className='flex gap-4'>
              <img
               className='h-8 w-8 object-cover rounded-full' 
               src={noAvater} 
               alt="profile img" 
              />
              <div className='text-sm text-left'>
                <h3 className='font-medium text-[16px]'>
                  Jan Doe
                </h3>
                <p className='text-gray-400'>
                  jan@smail.com
                </p>
              </div>
            </div>
            <p className='text-red-700'>
              disconnect
            </p>
          </div>
        </div>
        <Link to='/login'>
          <div className='mt-4 flex items-center gap-4 cursor-pointer mx-4 hover:bg-hover-bg w-fit p-2 rounded-md'>
            <span className='text-xl'>
              <FiPlus />
            </span>
            <p>
              use anthor account
            </p>
          </div> 
        </Link> 
      </CenterComponent>
    </div>
  )
}

export default ChooseAccount;