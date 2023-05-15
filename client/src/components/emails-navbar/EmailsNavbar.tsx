import React, { useState } from 'react';

import { IoMdRefresh } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import TooltipComponent from '../tooltip-component/TooltipComponent';
import Icon from '../icon/Icon';

import './emails-navbar.css';

const EmailsNavbar: React.FC = () => {
  
  const [checked, setChecked] = useState(false);

  function handleChecked () {
    setChecked(prevChecked => !prevChecked);
  }

  return (
    <div className='sticky flex justify-between items-center bg-secondary-dark-bg top-0 w-full py-2 px-4'>
      <div className='flex gap-4 items-center text-md'>
        <span className='ml-1'>
          <Icon
           title='Refresh'
           iconPosition='bottom'
           color='white'
           bgColor='bg-gray-400'
           icon={<IoMdRefresh />}
           customFunc={() => console.log('refresh emails!')} 
          />
        </span>
        {/* <TooltipComponent
         message='Refresh'
         direction='bottom'
        >
          <IoMdRefresh />
        </TooltipComponent> */}
        <input 
         type="checkbox"
         checked={checked}
         className=''
         onChange={handleChecked} 
        />
        {checked ? (
          <Icon
           title='Delete Emails'
           iconPosition='bottom'
           color='white'
           bgColor='bg-gray-400'
           icon={<MdDelete />}
           customFunc={() => console.log('delete emails!')} 
          />
        //   <TooltipComponent
        //    message='Delete Emails'
        //    direction='bottom'
        //   >
        //     <MdDelete />
        //  </TooltipComponent>
        ) : null}
      </div>
      <div>
        <select className='text-black rounded-md focus:outline-none'>
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