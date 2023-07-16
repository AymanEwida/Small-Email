import React from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';

import Icon from '../icon/Icon';

import { Void } from '../../types/types';

import './settings-item-header.css';

interface SettingsItemHeaderProps {
  title : string,
  children : React.ReactNode
  closeFunc : Void
}

const SettingsItemHeader: React.FC<SettingsItemHeaderProps> = ({ title, children, closeFunc }) => {
  return (
    <div className='pt-32 m-auto w-fit h-screen'>
      <span className='flex justify-end mb-5'>
        <Icon
         title='Go Back'
         iconPosition='bottom'
         color='rgb(153, 171, 180)'
         customFunc={closeFunc}
         icon={<AiOutlineArrowRight />}
         bgColor='bg-gray-700' 
        />
      </span>
      <h1 className='text-center border-b-1 color-border pb-3 text-2xl px-8'>
        {title}
      </h1>
      {children}
    </div>
  )
}

export default SettingsItemHeader;