import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import { IoMdCloseCircle } from 'react-icons/io';
import { BsFillPencilFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { AiFillDelete } from 'react-icons/ai';

import Icon from '../icon/Icon';
import Button from '../button/Button';
import ClipboardCopy from '../clipboard-copy/ClipboardCopy';
import UpdateGroup from '../update-group/UpdateGroup';
import AddNewParticipates from '../add-new-participates/AddNewParticipates';
import LoadingComponent from '../loading-component/LoadingComponent';

import noGroupAvatar from '../../assests/noGroupAvatar.png';
import noAvater from '../../assests/noAvatar.png';

import { Void, Optional } from '../../types/types';

import './group-settings.css';

type GroupParticipate = {
  participateID : string;
  isAdmin : boolean;
  _id : string;
  user : {_id: string, username: string, email: string, userImg: string};
}

interface GroupSettingsProps {
  category : Optional<string>,
  isCurrentUserAdmin : boolean,
  groupID : Optional<string>,
  groupImg : string,
  groupName : string,
  groupEmail : string,
  groupDesc : string,
  groupParticipates : GroupParticipate[],
  closeFunc : Void,
  toggleFunc : Void
}

enum UpdateGroupTypes {
  OpenChangeImg = "OPEN_CHANGE_IMAGE",
  OpenChangeName = "OPEN_CHANGE_NAME",
  OpenChangeEmail = "OPEN_CHANGE_EMAIL",
  OpenChangeDesc = "OPEN_CHANGE_DESCRIPTION"
}

const GroupSettings: React.FC<GroupSettingsProps> = ({ category, isCurrentUserAdmin, groupID, groupImg, groupName, groupEmail, groupDesc, groupParticipates, closeFunc, toggleFunc }) => {

  const queryClient = useQueryClient();

  const [updateGroupCredentials, setupdateGroupCredentials] = useState<{groupCredential: string, groupCredentialValue: string} | null>(null);
  const [isAddNewParticipatesOpen, setIsAddNewParticipatesOpen] = useState(false);

  const history = useNavigate();

  const removeMemberMutation = useMutation(async (participateID: string) => {
    const res = await axios.patch(`http://localhost:8800/api/v1/group/remove/${groupID}`, {participateID: participateID}, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('group');
    }
  });

  const makeMemberAdminMutation = useMutation(async (participateID: string) => {
    const res = await axios.patch(`http://localhost:8800/api/v1/group/make-admin/${groupID}`, {participateID: participateID}, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('group');
    }
  });

  const removeCurrentUserAdminMutation = useMutation(async () => {
    const res = await axios.patch(`http://localhost:8800/api/v1/group/remove-admin/${groupID}`, {}, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('group');
    }
  });

  const leaveGroupMutation = useMutation(async () => {
    const res = await axios.patch(`http://localhost:8800/api/v1/group/leave/${groupID}`, {}, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('groups');
    }
  });

  const deleteGroupMutation = useMutation(async () => {
    const res = await axios.delete(`http://localhost:8800/api/v1/group/${groupID}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('groups');
      history('/groups');
    }
  });

  function handleUpdateGroupCredentials (type: string): void {
    switch (type) {
      case UpdateGroupTypes.OpenChangeImg:
        setupdateGroupCredentials({groupCredential: "Change Image", groupCredentialValue: groupImg});
        break;
      case UpdateGroupTypes.OpenChangeName:
        setupdateGroupCredentials({groupCredential: "Change Name", groupCredentialValue: groupName});
        break;
      case UpdateGroupTypes.OpenChangeEmail:
        setupdateGroupCredentials({groupCredential: "Change Email", groupCredentialValue: groupEmail});
        break;
      case UpdateGroupTypes.OpenChangeDesc:
        setupdateGroupCredentials({groupCredential: "Change Description", groupCredentialValue: groupDesc});
        break;
      default:
        setupdateGroupCredentials(null);
        break;
    }

    setIsAddNewParticipatesOpen(false);
  }

  function handleOpenAddNewParticipates (): void {
    handleUpdateGroupCredentials("");
    setIsAddNewParticipatesOpen(true);
  }

  return (
    <div className='sticky bottom-0 left-0 z-index h-full bg-[#42464D] py-5 px-4 w-80'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-sm'>
          Group Settings
        </h1>
        <Icon
         title='Close'
         iconPosition='bottom'
         color='white'
         bgColor='bg-gray-400'
         icon={<IoMdCloseCircle />}
         textSize='md'
         customFunc={closeFunc} 
        />
      </div>
      <div className='mt-4 border-color border-b-1 pb-4 '>
        <div className='flex gap-6 mb-4'>
          <div className='relative'>
            <img 
             className='rounded-full object-cover h-10 w-10 bg-white'
             src={noGroupAvatar} 
             alt="group img" 
            />
            {isCurrentUserAdmin ? <span className='absolute -top-3 -right-3 cursor-pointer'>
              <Icon
               title='Eide Image'
               iconPosition='right'
               color='rgb(209 213 219)'
               bgColor='bg-gray-500'
               icon={<BsFillPencilFill />}
               textSize='sm'
               customFunc={() => handleUpdateGroupCredentials(UpdateGroupTypes.OpenChangeImg)} 
              />
            </span> : null}
          </div>
          <div className=''>
            <h2 className='text-xl font-bold mb-1'>
              {groupName}
            </h2>
            {isCurrentUserAdmin ? <Button
             type='button'
             text="change group's name"
             bgColor='rgb(94 234 212)'
             paddingSize='1'
             textSize='sm'
             color='white'
             borderRadius='5px'
             customFunc={() => handleUpdateGroupCredentials(UpdateGroupTypes.OpenChangeName)} 
            /> : null }
            <p className='text-sm my-2'>
              <ClipboardCopy copyText={groupEmail} />
            </p>
            {isCurrentUserAdmin ? <Button
             type='button'
             text="change group's email"
             bgColor='rgb(94 234 212)'
             paddingSize='1'
             textSize='sm'
             color='white'
             borderRadius='5px'
             customFunc={() => handleUpdateGroupCredentials(UpdateGroupTypes.OpenChangeEmail)} 
            /> : null }
          </div>
        </div>
        <Link to={`/groups/${category && category === 'conversation' ? 'enails' : 'conversation'}?g_id=${groupID}`}>
          <Button
           type='button'
           bgColor='rgb(74 222 128)'
           text={`Open Group's ${category && category === 'conversation' ? 'Emails' : 'Chat'}`}
           textSize='md'
           borderRadius='10px'
           paddingSize='1'
           width='100%'
           color='white'
           customFunc={toggleFunc} 
          />
        </Link>
      </div>
      <div className='border-color border-b-1 py-4 text-center'>
        <p className='text-gray-300 text-sm'>
          {groupDesc}
        </p>
        <div className='mt-8'>
          {isCurrentUserAdmin ? <Button
           type='button'
           text="change group's description"
           bgColor='rgb(94 234 212)'
           paddingSize='1'
           textSize='sm'
           color='white'
           borderRadius='5px'
           customFunc={() => handleUpdateGroupCredentials(UpdateGroupTypes.OpenChangeDesc)} 
          /> : null}
        </div>
      </div>
      <div className='p-2'>
        <h2 className='text-center text-gray-200 text-lg underline font-semibold mb-2'> 
          Participates Users
        </h2>
        {isCurrentUserAdmin ? <Button
         type='button'
         bgColor='rgb(94 234 212)'
         text='Add new participates'
         textSize='md'
         borderRadius='10px'
         paddingSize='1'
         width='100%'
         color='white'
         customFunc={handleOpenAddNewParticipates} 
        /> : null}
        <div className='overflow-y-auto h-72'>
          {groupParticipates.map((participate, index) => (
            <div key={participate._id} className='border-color border-b-1 py-4 w-full'>
              <div className='flex gap-2 items-center'>
                <img
                 className='h-8 w-8 rounded-full object-cover' 
                 src={noAvater} 
                 alt="profile image" 
                />
                {Cookies.get('username') === participate.user.username ? (
                  <p className='text-gray-100 font-medium'>
                    Me
                  </p>
                ) : (
                <p className='text-gray-100 font-medium'>
                  {participate.user.username} <span className='text-gray-300 font-light'>{'<'}{participate.user.email}{'>'}</span>
                </p>
                )}
              </div>
              {participate.isAdmin ? <p className='text-gray-400 my-2 text-center font-medium'>
                status: <span className='text-gray-200 font-semibold'>Admin</span>
              </p> : null}
              {isCurrentUserAdmin && Cookies.get('username') !== participate.user.username ? <div className='mt-2 flex gap-2 justify-center items-center'>
                <Button
                type='button'
                bgColor='rgb(248 113 113)'
                text={removeMemberMutation.isLoading ? <LoadingComponent style='circle' /> : 'Remove'}
                textSize='md'
                borderRadius='5px'
                paddingSize='1'
                color='white'
                customFunc={() => removeMemberMutation.mutate(participate.participateID)} 
                />
                {!participate.isAdmin ? <Button
                type='button'
                bgColor='rgb(94 234 212)'
                text={makeMemberAdminMutation.isLoading ? <LoadingComponent style='circle' /> : 'Make Admin'}
                textSize='md'
                borderRadius='5px'
                paddingSize='1'
                color='white'
                customFunc={() => makeMemberAdminMutation.mutate(participate.participateID)} 
                /> : null}
              </div> : null}
              {isCurrentUserAdmin && Cookies.get('username') === participate.user.username ? <div className='flex items-center justify-center'><Button
                type='button'
                bgColor='rgb(220 38 38)'
                text={removeCurrentUserAdminMutation.isLoading ? <LoadingComponent style='circle' /> : 'Remove Admin'}
                textSize='md'
                borderRadius='5px'
                paddingSize='1'
                color='white'
                customFunc={() => removeCurrentUserAdminMutation.mutate()} 
                /></div> : null}   
            </div>
          ))}
          {/* {isCurrentUserAdmin ? <div className='mt-2'><Button
           type='button'
           bgColor='rgb(94 234 212)'
           text='Add new participates'
           textSize='md'
           borderRadius='10px'
           paddingSize='1'
           color='white'
           customFunc={handleOpenAddNewParticipates} 
          /></div> : null} */}
        </div>
      </div>
      <span className='absolute -bottom-1 left-10'>
        <Icon
         title='Leave Group'
         iconPosition='top'
         color='white'
         bgColor='bg-gray-500'
         icon={<ImExit />}
         textSize='md'
         customFunc={() => {
          leaveGroupMutation.mutate();
          history('/groups');
         }}
        />
      </span>
      {isCurrentUserAdmin ? <span className='absolute -bottom-1 right-10'>
        <Icon
         title='Delete Group'
         iconPosition='top'
         color='white'
         bgColor='bg-gray-500'
         icon={<AiFillDelete />}
         textSize='md'
         customFunc={() => deleteGroupMutation.mutate()} 
        />
      </span> : null}
      {updateGroupCredentials ? (
        <UpdateGroup
         groupID={groupID}
         groupCredential={updateGroupCredentials.groupCredential}
         groupCredentialValue={updateGroupCredentials.groupCredentialValue}
         closeFunc={() => handleUpdateGroupCredentials("")} 
        />
      ) : null}
      {isAddNewParticipatesOpen ? (
        <AddNewParticipates
         groupID={groupID}
         closeFunc={() => setIsAddNewParticipatesOpen(false)} 
        />
      ) : null}
    </div>
  )
}

export default GroupSettings;