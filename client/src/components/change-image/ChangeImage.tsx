import React from 'react';

import SettingsItemHeader from '../settings-item-header/SettingsItemHeader';

import { Void } from '../../types/types';

import noAvater from '../../assests/noAvatar.png';

import './change-image.css';

interface ChangeImageProps {
  closeChangeImage: Void
}

const ChangeImage: React.FC<ChangeImageProps> = ({ closeChangeImage }) => {
  return (
    <SettingsItemHeader
     title='Change Image'
     closeFunc={closeChangeImage}
    >
      <div className='mt-5 flex flex-col gap-4 items-center w-full'>
        <img
         className='rounded-full object-cover h-20 w-20' 
         src={noAvater} 
         alt="profile image" 
        />
        <input
         className='cursor-pointer'
         type="file" 
        />
      </div>
    </SettingsItemHeader>
  )
}

export default ChangeImage;