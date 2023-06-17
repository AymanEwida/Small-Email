import React from 'react'

import {
  Header
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
        Workspace
      </div>
    </>
  )
}

export default Workspace;