import React from 'react';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { buttons } from './buttonData';

import './home-page-navbar.css';

const HomePageNavbar: React.FC = () => {
  return (
    <nav className='w-full fixed top-0 left-0 bg-black flex justify-between items-center py-2 px-3 drop-shadow-lg z-index'>
      <h1 className='text-2xl italic font-bold text-gray-300'>
        Small Email
      </h1>
      <div className='flex items-center gap-4'>
        {buttons.map((button, index) => (
          <Link
           key={index}
           to={button.to}
          >
            <Button
             type='button'
             paddingSize='2'
             textSize='md'
             color='rgb(229 231 235)'
             bgColor={button.bgColor}
             text={button.text}
             special={button.special}
            />
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default HomePageNavbar;