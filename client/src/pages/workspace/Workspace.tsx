import React from 'react'

import {
  Header,
  WorkspaceSidebar
} from '../../components';

import './workspace.css';

const Workspace: React.FC = () => {
  return (
    <>
      <Header
       category='Workspace'
       textSize='lg' 
      />
      <div className='p-3'>
        <WorkspaceSidebar />
        <p className='pl-80'>
          ddfdgfdf
        </p>
      </div>
    </>
  )
}

export default Workspace;