import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { BsFillPencilFill } from 'react-icons/bs';

import { links, bottomLinks } from './data';

import { Void } from '../../types/types';

import './sidebar.css';

interface SidebarProps {
  isMenuActive : boolean,
  sendEmailFunc : Void
}

const Sidebar: React.FC<SidebarProps> = ({ isMenuActive, sendEmailFunc }) => {

  const history = useNavigate();

  return (
    <aside className={`h-full overflow-y-auto bg-black fixed top-0 left-0 pt-20 ${isMenuActive ? 'w-72 px-5' : 'w-16 p-2 text-center'} text-gray-200`}>
      <button
       type='button'
       className={`bg-teal-500 ${isMenuActive ? 'p-2' : 'p-3'} rounded-lg hover:scale-110 transition ease-out duration-200 hover:drop-shadow-lg`}
       onClick={sendEmailFunc}
      >
        <div className={`flex gap-2 items-center ${isMenuActive ? 'text-md' : 'text-2xl'}`}>
          <BsFillPencilFill />
          {isMenuActive ? (
            <p>
              New Email
            </p>
          ) : null}
        </div>
      </button>
      <div className='mt-5'>
        {links.map((link, index) => (
          <NavLink
           key={index}
           to={link.linkTo}
           className={({ isActive }) => isActive ? `flex gap-2 items-center mb-3 p-3 bg-teal-500 rounded-full ${isMenuActive ? 'text-md' : 'text-2xl'} text-black` : `flex gap-2 items-center mb-3 p-3 hover:bg-hover-bg rounded-full ${isMenuActive ? 'text-md' : 'text-2xl'}`}
          >
            {link.linkIcon}
            {isMenuActive ? (
              <p className='font-bold'>
                {link.linkMeesage}
              </p>
            ) : null}
          </NavLink>
        ))}
      </div>
      <hr className='bg-gray-700' />
      <div className='absolute bottom-5'>
        {bottomLinks.map((link, index) => (
          <NavLink
           key={index}
           onClick={() => {
            if (link.linkTo === '/choose-account') {
              Cookies.remove('token');
              Cookies.remove('username');
              Cookies.remove('email');
              Cookies.remove('userImg');
              window.location.href = 'http://localhost:3000/choose-account';
            }
           }}
           to={link.linkTo}
           className={({ isActive }) => isActive ? `flex gap-2 items-center mb-3 p-3 bg-teal-500 rounded-full ${isMenuActive ? 'text-md' : 'text-2xl'} text-black` : `flex gap-2 items-center mb-3 p-3 hover:bg-hover-bg rounded-full ${isMenuActive ? 'text-md' : 'text-2xl'}`}
          >
            {link.linkIcon}
            {isMenuActive ? (
              <p className='font-bold'>
                {link.linkMeesage}
              </p>
            ) : null}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar;