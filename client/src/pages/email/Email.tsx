import React from 'react'

import { Navigate, useParams } from 'react-router-dom';

import {
  EmailNavbar,
  EmailLayout,
} from '../../components';

import { getParamsFromURL } from '../../hooks/useParams';

import {
  buttons
} from './buttonsData';

import './email.css';

const Email: React.FC = () => {

  const queryStrings = getParamsFromURL(document.location.href);

  const { emailCategory } = useParams();

  console.log({ queryStrings })

  return (
    <>
      <EmailNavbar
       category={emailCategory} 
      />
      <div className='px-4 mb-4'>
        <EmailLayout
         subject='Test'
         sender={{username: 'Jhon_Doe', email: 'jhon@smail.com'}}
         recipients={emailCategory === 'inbox' || emailCategory === 'groups' ? [{recipientEmail: 'Me<jan@smail.com>'}] : [{recipientEmail: 'jan@smail.com'}, {recipientEmail: 'jan@smail.com'}, {recipientEmail: 'jan@smail.com'}]}
         content={`
                  <div>
                    <h1>it is a test</h1>
                    <img src='https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg' />
                  </div>
         `} 
        />
        {emailCategory === 'inbox' || emailCategory === 'groups' ? (
          <div className='grid grid-cols-2 gap-3 w-fit'>
            {buttons.map((button, index) => (
              <button
               key={index}
               type='button'
               className='flex gap-2 items-center p-2 text-md mt-3 hover:drop-shadow-xl rounded-md bg-green-400'
               onClick={() => console.log(`I want to ${button.functionCategory} to this email`)}
              >
                <span>
                  {button.icon}
                </span>
                {button.text}
              </button>
            ))}
          </div>
        ) :
        emailCategory === 'sent' ? (
          <button
           type='button'
           className='flex gap-2 items-center p-2 text-md mt-3 hover:drop-shadow-xl rounded-md bg-green-400'
           onClick={() => console.log(`I want to ${buttons[0].functionCategory} to this email`)}
          >
           <span>
             {buttons[0].icon}
           </span>
           {buttons[0].text}
         </button>
        ) : <Navigate to='/inbox' />}
      </div>
    </>
  )
}

export default Email;