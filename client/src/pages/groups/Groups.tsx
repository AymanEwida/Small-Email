import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { useQuery } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import {
  Header,
  GroupCard,
  Button,
  CreateGroup,
  LoadingComponent,
  Tefo
} from '../../components';

import { range } from '../../functions';

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

  const {isError, error, isLoading, data} = useQuery('groups', async () => {
    const res = await axios.get('http://localhost:8800/api/v1/group', { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  });

  if (isLoading) {
    return (
      <>
        <Header
         category='Groups'
         textSize='lg' 
        />
        <div className='sticky top-0'>
          <LoadingComponent style='line' />
        </div>
        <div className='flex gap-5 flex-wrap items-center flex-row p-3'>
          {range(0, 8, 1).map((idx) => (
            <div 
             key={idx} 
             className='bg-gray-400 rounded-md w-44 h-44' 
            />
          ))}
        </div>
      </>
    );
  }

  if (isError && (error instanceof AxiosError)) {
    return (
      <Tefo isError message={error.response?.data.msg} />
    );
  }

  return (
    <>
      <Header
       category='Groups'
       textSize='lg' 
      />
      <div className='p-3 flex gap-5 flex-wrap items-center'>
        {data.allGroupsOfAUser.map((group: any) => (
          <Link key={group._id} to={`/groups/emails?g_id=${group._id}`}>
            <GroupCard
             name={group.groupName}
             email={group.groupEmail}
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