import React from 'react';

import Cookies from 'js-cookie';

import SettingsItemHeader from '../settings-item-header/SettingsItemHeader';
import Button from '../button/Button';

import noAvater from '../../assests/noAvatar.png';

import { Void } from '../../types/types';

import './personal-details-settings.css';

interface PersonalDetailsSettingsProps {
  closePersonalDetails: Void,
  openPersonalDetailsItem: (settingsInfo: string) => void,
}

const PersonalDetailsSettings: React.FC<PersonalDetailsSettingsProps> = ({ closePersonalDetails, openPersonalDetailsItem }) => {
  return (
    <SettingsItemHeader
     title='Personal Details'
     closeFunc={closePersonalDetails}
    >
      <div className='p-4 border-b-1 color-border w-full hover:bg-hover-bg cursor-pointer'>
        <div className='flex flex-col items-center gap-3'>
          <h1 className='text-xl font-semibold text-green-400'>
            Change Username
          </h1>
          <h2 className='text-gray-400 font-medium text-lg'> 
            {Cookies.get('username')}
          </h2>
          <Button
           type='button'
           color='white'
           bgColor='rgb(94 234 212)'
           text='Change Username'
           borderRadius='10px'
           paddingSize='2'
           textSize='md'
           customFunc={() => openPersonalDetailsItem('CHANGE_USERNAME')}
          />
        </div>
      </div>
      <div className='p-4 border-b-1 color-border w-full hover:bg-hover-bg cursor-pointer'>
        <div className='flex flex-col items-center gap-3'>
          <h1 className='text-xl font-semibold text-green-400'>
            Change Image
          </h1>
          <img 
           className='rounded-full object-cover h-10 w-10'
           src={Cookies.get('userImg') ? Cookies.get('userImg') : noAvater}
           alt='profile image' 
          /> 
          <Button
           type='button'
           color='white'
           bgColor='rgb(94 234 212)'
           text='Change Username'
           borderRadius='10px'
           paddingSize='2'
           textSize='md'
           customFunc={() => openPersonalDetailsItem('CHANGE_IMAGE')}
          />
        </div>
      </div>
      <div className='p-4 border-b-1 color-border w-full hover:bg-hover-bg cursor-pointer'>
        <div className='flex flex-col items-center gap-3'>
          <h1 className='text-xl font-semibold text-green-400'>
            Change Email
          </h1>
          <h2 className='text-gray-400 font-medium text-lg'> 
            {Cookies.get('email')}
          </h2>
          <Button
           type='button'
           color='white'
           bgColor='rgb(94 234 212)'
           text='Change Email'
           borderRadius='10px'
           paddingSize='2'
           textSize='md'
           customFunc={() => openPersonalDetailsItem('CHANGE_EMAIL')}
          />
        </div>
      </div>
    </SettingsItemHeader>
  )
}

export default PersonalDetailsSettings;