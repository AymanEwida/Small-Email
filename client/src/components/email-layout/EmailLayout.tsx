import React, { ReactNode } from 'react';

import Cookies from 'js-cookie';

import parse from 'html-react-parser';

import noAvatar from '../../assests/noAvatar.png';

import './email-layout.css';

type recipient = {
  recipientEmail : string
}

interface EmailLayoutProps {
  subject : string,
  sender : {username : string, email ?: string, userImg ?: string},
  recipients : recipient[],
  content : string,
}

const EmailLayout: React.FC<EmailLayoutProps> = ({ subject, sender, recipients, content }) => {  
  return (
    <div className='py-3'>
      <h1 className='font-bold text-2xl'>
        {subject}
      </h1>
      <div className='flex items-center gap-3 mt-8'>
        <img
         className='h-8 w-8 rounded-full object-cover' 
         src={sender.userImg ? sender.userImg : noAvatar} 
         alt="profile image" 
        />
        {Cookies.get('username') === sender.username ? (
          <p className='text-md font-bold'>
            Me
          </p>
        ) : (
          <p className='text-md font-bold'>
            {sender.username}
            <span className='font-semibold text-gray-400'>
              {'<'}{sender.email}{'>'}
            </span>
          </p>
        )}
      </div>
      <div className='mt-2'>
        <h2 className='text-gray-500'>
          To:
        </h2>
        <div className='flex flex-row gap-2 overflow-x-auto w-96 ml-5'>
          {recipients.map((recipient, index) => (
            <p
             key={index}
             className='flex items-center gap-1'
            >
              <span className='bg-blue-400 rounded-full py-1 px-2'>{recipient.recipientEmail}</span> {index === recipients.length-1 ? '' : ','}
            </p>
          ))}
        </div>
      </div>
      <div className='mt-10 bg-slate-700 w-full rounded-md p-5 h-fit'>
        {parse(content)}
      </div>
    </div>
  )
}

export default EmailLayout;