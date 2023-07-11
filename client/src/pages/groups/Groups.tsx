import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import {
  Header,
  GroupCard,
  Button,
  CreateGroup
} from '../../components'

import { groups } from './dummyData';

import './groups.css';

const Groups: React.FC = () => {

  const [isCreateScreenShow, setIsCreateScreenShow] = useState(false);

  function handleDisplayCreateScreen (): void {
    setIsCreateScreenShow(prevIsCreateScreenShow => !prevIsCreateScreenShow);
  }

  function handleCloseCreateScreen (): void {
    setIsCreateScreenShow(false);
  }

  return (
    <>
      <Header
       category='Groups'
       textSize='lg' 
      />
      <div className='p-3 flex gap-5 flex-wrap items-center'>
        {groups.map((group, index) => (
          <Link key={index} to={`/groups/emails?g_id=${index+1}`}>
            <GroupCard
             name={group.name}
             email={group.email}
            />
          </Link>
        ))}
      </div>
      <div className='absolute bottom-4 right-4'>
        <Button
         type='button'
         text='Create New Group'
         textSize='md'
         paddingSize='2'
         bgColor='rgb(74 222 128)'
         color='white'
         borderRadius='10px'
         customFunc={handleDisplayCreateScreen} 
        />
      </div>
      {isCreateScreenShow ? (
        <CreateGroup
         closeFunc={handleCloseCreateScreen} 
        />
      ) : null}
    </>
  )
}

export default Groups;