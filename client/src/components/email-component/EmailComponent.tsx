import React, { useState } from 'react';

import { AiFillDelete } from 'react-icons/ai';

import Icon from '../icon/Icon';

import './email-component.css';

const EmailComponent: React.FC = () => {

  const [isChecked, setIsChecked] = useState(false);

  function handleCheck (): void {
    setIsChecked(prevIsChecked => !prevIsChecked);
  }

  return (
    <div className='bg-black w-full py-2 px-9 lg:px-12 hover:scale-105 transition duration-300 text-md hover:drop-shadow-lg'>
      <div className='flex justify-between items-center pb-1 border-b-1 w-full border-inherit'>
        <div className='flex items-center gap-3'>
          <input 
           type="checkbox"
           className=' cursor-pointer text-md'
           checked={isChecked}
           onChange={handleCheck} 
          />
          <h2 className='font-bold text-green-400'>
            Jhon_Doe
          </h2>
        </div>
        <p className='text-gray-300 text-clip w-96 overflow-hidden'>
          WelcomeWelcomeWelcomeWelcomeWelcomeWelcome
        </p>
        <Icon
         title='Delete Email'
         iconPosition='bottom'
         bgColor='bg-gray-700'
         color='white'
         icon={<AiFillDelete />}
         customFunc={() => console.log('I want to delete this email!!')} 
        />
      </div>
      <p className='overflow-hidden text-ellipsis whitespace-nowrap w-96 text-gray-200'>
        Hi Jan Doe, how are you?  
        Hi Jan Doe, how are you?  
        Hi Jan Doe, how are you?  
        Hi Jan Doe, how are you?
      </p>
    </div>
  )
}

export default EmailComponent;