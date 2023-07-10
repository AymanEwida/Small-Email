import React from 'react';

import { Link } from 'react-router-dom';

import { BsArrowLeft } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { BiCommentEdit } from 'react-icons/bi';

import { Optional } from '../../types/types';

import Icon from '../icon/Icon';

import './email-navbar.css';

interface EmailNavbarProps {
  category : Optional<string>,
}

const EmailNavbar: React.FC<EmailNavbarProps> = ({ category }) => {
  return (
    <div className='sticky bg-secondary-dark-bg top-0 w-full py-2 px-8'>
      <h2 className='text-center text-gray-400 font-bold color-border border-b-1 pb-3 w-full'>
        {category}
      </h2>
      <div className='flex gap-4 items-center mt-2.5'>
        <Link to={category === 'groups' ? `/${category}/emails?g_id=1` : `/${category}`}>
          <Icon
           title='Go Back'
           iconPosition='bottom'
           color='white'
           icon={<BsArrowLeft />}
           textSize='md'
           bgColor='bg-gray-400' 
          />
        </Link>
        {category === 'sent' ? (     
          <div className='flex items-center gap-2'>
            <span className='border-r-2 pr-2 b-color'>
              <Icon
               title='Delete Email' 
               iconPosition='bottom'
               color='white'
               icon={<MdDelete />}
               textSize='md'
               bgColor='bg-gray-400' 
              />
            </span>
            <Icon
             title='Edit Email' 
             iconPosition='bottom'
             color='white'
             icon={<BiCommentEdit />}
             textSize='md'
             bgColor='bg-gray-400' 
            />
          </div>
        ) : (
        <Icon
         title='Delete Email' 
         iconPosition='bottom'
         color='white'
         icon={<MdDelete />}
         textSize='md'
         bgColor='bg-gray-400' 
        />
        )}
      </div>
    </div>
  )
}

export default EmailNavbar;