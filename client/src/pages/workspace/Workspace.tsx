import React, { useContext } from 'react'

import {
  WorkspaceSidebar
} from '../../components';

import { fileContentContext } from '../../context/file-content-context/fileContentContext';

import './workspace.css';

const Workspace: React.FC = () => {

  const {
    state
  } = useContext(fileContentContext);

  return (
    <div className='h-full w-full flex flex-row'>
      <WorkspaceSidebar />
      <div className='mx-5 my-2'>
        <textarea
         cols={250}  
         style={{ resize: 'none' }}
         className='text-white bg-transparent w-full outline-none h-full'
         value={state.fileContent}
         readOnly
        />
      </div>
    </div>
  )
}

export default Workspace;