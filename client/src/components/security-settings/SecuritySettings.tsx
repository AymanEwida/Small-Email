import React from 'react';

import SettingsItemHeader from '../settings-item-header/SettingsItemHeader';
import Button from '../button/Button';

import { Void } from '../../types/types';

import './security-settings.css';

interface SecuritySettingsProps {
  closeSecurity : Void,
  openSecurityItem : (settingsInfo: string) => void,
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ closeSecurity, openSecurityItem }) => {
  return (
    <SettingsItemHeader
     title='Security'
     closeFunc={closeSecurity}
    >
      <div className='p-4 border-b-1 color-border w-full hover:bg-hover-bg cursor-pointer'>
        <div className='flex flex-col items-center gap-3'>
          <h1 className='text-xl font-semibold text-green-400'>
            Enable 2FA
          </h1>
          <Button
           type='button'
           color='white'
           bgColor='rgb(94 234 212)'
           text='Enable 2FA'
           borderRadius='10px'
           paddingSize='2'
           textSize='md'
           customFunc={() => openSecurityItem('CHANGE_2FA')}
          />
        </div>
      </div>
      <div className='p-4 border-b-1 color-border w-full hover:bg-hover-bg cursor-pointer'>
        <div className='flex flex-col items-center gap-3'>
          <h1 className='text-xl font-semibold text-green-400'>
            Change Password
          </h1>
          <Button
           type='button'
           color='white'
           bgColor='rgb(94 234 212)'
           text='Change Password'
           borderRadius='10px'
           paddingSize='2'
           textSize='md'
           customFunc={() => openSecurityItem('CHANGE_PASSWORD')}
          />
        </div>
      </div>
    </SettingsItemHeader>
  )
}

export default SecuritySettings;