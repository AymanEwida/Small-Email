import React from 'react';

import { Link } from 'react-router-dom';

import {
  Header,
  GroupCard
} from '../../components'

import { groups } from './dummyData';

import './groups.css';

const Groups: React.FC = () => {
  return (
    <>
      <Header
       category='Groups' 
      />
      <div className='p-3 flex gap-5 flex-wrap items-center'>
        {groups.map((group, index) => (
          <Link to={`/groups/emails?g_id=${index+1}`}>
            <GroupCard
             key={index}
             name={group.name}
             email={group.email}
            />
          </Link>
        ))}
      </div>
    </>
  )
}

export default Groups;