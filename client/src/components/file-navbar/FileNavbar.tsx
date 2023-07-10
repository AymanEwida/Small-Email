import React from 'react';

import { VscNewFolder, VscNewFile } from 'react-icons/vsc';
import { AiOutlineFolderOpen } from 'react-icons/ai';

import Icon from '../icon/Icon';

import { Void, Optional } from '../../types/types';

import './file-navbar.css';

interface FileNavbarProps {
  folderName : Optional<string>,
  getFolderFn : Void,
}

const FileNavbar: React.FC<FileNavbarProps> = ({ folderName, getFolderFn }) => {
  return (
    <div className='sticky top-0 w-full bg-secondary-dark-bg p-2 flex justify-between items-center'>
      <h1 className='text-sm font-bold text-gray-300'>
        {folderName ? folderName : "No Folder Open"}
      </h1>
      <div className='flex gap-2 items-center'>
        {folderName ? (
          <>
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
          </> 
        ) : null}
        <div className={folderName ? 'border-l-1 border-inherit border-solid pl-0.5' : ''}>
          <Icon
           title='Open Folder'
           iconPosition='bottom'
           color='white'
           icon={<AiOutlineFolderOpen />}
           bgColor='bg-gray-700'
           customFunc={getFolderFn} 
          />
        </div>
      </div>
    </div>
  )
}

export default FileNavbar;