import React from 'react';

import { VscNewFolder, VscNewFile } from 'react-icons/vsc';
import { AiOutlineFolderOpen } from 'react-icons/ai';

import Icon from '../icon/Icon';

import './file-navbar.css';

const FileNavbar: React.FC = () => {
  return (
    <div className='sticky top-0 w-full bg-secondary-dark-bg p-2 flex justify-between items-center'>
      <h1 className='text-sm font-bold text-gray-300'>
        Folder name
      </h1>
      <div className='flex gap-2 items-center'>
        <Icon
         title='New Folder'
         iconPosition='bottom'
         color='white'
         icon={<VscNewFolder />}
         bgColor='bg-gray-700' 
        />
        <Icon
         title='New File'
         iconPosition='bottom'
         color='white'
         icon={<VscNewFile />}
         bgColor='bg-gray-700' 
        />
        <div className='border-l-1 border-inherit border-solid pl-0.5'>
          <Icon
           title='Open Folder'
           iconPosition='bottom'
           color='white'
           icon={<AiOutlineFolderOpen />}
           bgColor='bg-gray-700' 
          />
        </div>
      </div>
    </div>
  )
}

export default FileNavbar;