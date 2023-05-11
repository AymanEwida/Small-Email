import React, { useState } from 'react';

import { IoMdRefresh } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import TooltipComponent from '../tooltip-component/TooltipComponent';

import './emails-navbar.css';

const EmailsNavbar: React.FC = () => {
  
  const [checked, setChecked] = useState(false);

  function handleChecked () {
    setChecked(prevChecked => !prevChecked);
  }

  return (
    <div className='sticky flex justify-between items-center bg-secondary-dark-bg top-0 w-full py-2 px-4'>
      <div className='flex gap-4 items-center text-md'>
        <TooltipComponent
         message='Refresh'
         direction='bottom'
        >
          <IoMdRefresh />
        </TooltipComponent>
        <input 
         type="checkbox"
         checked={checked}
         onChange={handleChecked} 
        />
        {checked ? (
          <TooltipComponent
           message='Delete Emails'
           direction='bottom'
          >
            <MdDelete />
         </TooltipComponent>
        ) : null}
      </div>
      <div>
        <select className='text-black rounded-md'>
          <option>
            Newer
          </option>
          <option>
            Older
          </option>
        </select>
      </div>
    </div>
  )
}

export default EmailsNavbar;