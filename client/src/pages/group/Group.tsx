import React, { useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import GroupEmails from '../group-emails/GroupEmails';

import {
  EmailComponent,
  GroupsNavbar,
  GroupSettings,
  LoadingComponent,
  Tefo,
} from '../../components';

import {
  arrayRepeat, 
  range
} from '../../functions';
import { getParamsFromURL } from '../../hooks/useParams';

import { Optional } from '../../types/types';

import './group.css';

const Group: React.FC = () => {
  
  const queryStrings = getParamsFromURL(document.location.href);

  const { groupCategory } = useParams();

  const [category, setCategory] = useState<Optional<string>>(groupCategory);
  const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);

  const {isError, error, isLoading, data, refetch} = useQuery('group', async () => {
    const res = await axios.get(`http://localhost:8800/api/v1/group/${queryStrings?.g_id}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    enabled: !!queryStrings?.g_id
  });

  function toggleCategory (): void {
    setIsSettingMenuOpen(false);

    if (category === 'emails') {
      setCategory('conversation');
    } else {
      setCategory('emails');
    }
  }

  function openSettingsMenu (): void {
    setIsSettingMenuOpen(true);
  }

  function closeSettingsMenu (): void {
    setIsSettingMenuOpen(false);
  }

  function checkIfCurrentUserIsAdmin (): boolean {
    for (let i = 0; i < data.participates.length; i++) {
      const participate: {participateID : string, isAdmin : boolean, _id : string, user : {_id: string, username: string, email: string, userImg: string}} = data.participates[i];

      if (Cookies.get('username') === participate.user.username) {
        return participate.isAdmin;
      }
    }

    return false;
  }

  if(isLoading) {
    return (
      <>
      <div className=' pt-20 flex justify-center'>
        <LoadingComponent style='text' />
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
      {groupCategory === 'emails' ? (
        <GroupEmails
         groupID={queryStrings?.g_id}
         groupImg={data.groupImg}
         groupName={data.groupName}
         groupEmail={data.groupEmail} 
         groupCategory={category}
         toggleGroupCategory={toggleCategory}
         openSettingsMenu={openSettingsMenu} 
        />
      ) :
      groupCategory === 'conversation' ? (
        <div>
          Chat
        </div>
      ) : <Navigate to={`/groups/emails?g_id=${queryStrings?.g_id}`} />}
      {isSettingMenuOpen ? (
        <GroupSettings
         category={category}
         isCurrentUserAdmin={checkIfCurrentUserIsAdmin()}
         groupID={data._id}
         groupImg={data.groupImg}
         groupName={data.groupName}
         groupEmail={data.groupEmail} 
         groupDesc={data.groupDesc}
         groupParticipates={data.participates} 
         closeFunc={closeSettingsMenu}
         toggleFunc={toggleCategory} 
        /> 
      ) : null}
    </>
  )
}

export default Group;