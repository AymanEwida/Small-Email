import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useQuery, useMutation, useQueryClient } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import { IoMdCloseCircle } from 'react-icons/io';

import Icon from '../icon/Icon';
import Input from '../input/Input';
import FoundUsers from '../found-users/FoundUsers';
import Button from '../button/Button';
import TooltipComponent from '../tooltip-component/TooltipComponent';
import LoadingComponent from '../loading-component/LoadingComponent';
import Tefo from '../tefo/Tefo';

import noGroupAvatar from '../../assests/noGroupAvatar.png';

import { 
  Event,
  InputElement,
  Void
 } from '../../types/types';

import './create-group.css';

interface CreateGroupProps {
  closeFunc : Void,
}

const CreateGroup: React.FC<CreateGroupProps> = ({ closeFunc }) => {
  
  const queryClient = useQueryClient();

  const [inputsValue, setInputsValue] = useState({
    groupName: '',
    groupEmail: '',
    groupDesc: '',
    searchByEmail: '',
  });
  const [participates, setParticipates] = useState<string[]>([]);

  const {isError, error, isLoading, data} = useQuery(['searchByEmail', inputsValue.searchByEmail], async () => {
    const res = await axios.get(`http://localhost:8800/api/v1/user/search?email=${inputsValue.searchByEmail}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data
  }, {
    enabled: inputsValue.searchByEmail.length > 0
  });

  const mutation = useMutation(async (formData: {groupName: string, groupEmail: string, groupDesc?: string, groupImg?: string, participates: string[]}) => {
    const res = await axios.post('http://localhost:8800/api/v1/group/create', formData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('groups');
      history(`/groups/emails?g_id=${data.group._id}`);
    }
  });

  const history = useNavigate();

  function handleChange (event: Event<InputElement>): void {
    setInputsValue(prevInputsValue => (
      {
        ...prevInputsValue,
        [event.target.name]: event.target.value,
      }
    ));
  }

  function addParticipate (index: number): void {
    setParticipates(prevParticipates => (
      [...prevParticipates, data.users[index].email]
    ));
    setInputsValue(prevInputsValue => (
      {
        ...prevInputsValue,
        searchByEmail: '',
      }
    ));
  }

  function deleteParticipate (index: number): void {
    let newParticipates: string[] = [];

    for (let i = 0; i < participates.length; i++) {
      if (i !== index) {
        newParticipates.push(participates[i]);
      }
    }

    setParticipates(newParticipates);
  }

  function handleCreateGroup (event: React.FormEvent): void {
    event.preventDefault();

    if (participates.length > 0) {
      const validEmail = inputsValue.groupEmail + "@sgroup.com";

      mutation.mutate({groupName: inputsValue.groupName, groupEmail: validEmail, groupDesc: inputsValue.groupDesc, participates: participates});
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='absolute top-24 bg-black rounded-md overflow-hidden w-400'>
        <div className='w-full sticky top-0 bg-secondary-dark-bg p-3 flex justify-between items-center z-index'>
          <h1 className='font-bold text-sm'>
            Create New Group
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
        <form 
         className='p-3 flex flex-col gap-3'
         onSubmit={handleCreateGroup}
        >
          <Input
           type='text'
           id='groupName'
           label='Group Name'
           name='groupName'
           isRequired
           value={inputsValue.groupName}
           customFunc={handleChange}
          />
          <div className='flex items-center gap-2'>
            <Input
             type='text'
             id='groupEmail'
             label='Group Email'
             name='groupEmail'
             isRequired
             value={inputsValue.groupEmail}
             customFunc={handleChange}
            />
            <p>
              @sgroup.com
            </p> 
          </div>         
          <Input
           type='text'
           id='groupDesc'
           label='Group Desc(optional)'
           name='groupDesc'
           value={inputsValue.groupDesc}
           customFunc={handleChange}
          />
          <div>
            <Input
             type='text'
             id='participants'
             label='Participants'
             name='searchByEmail'
             value={inputsValue.searchByEmail}
             customFunc={handleChange}
            />
            {isLoading ? (
              <div className='mt-2 bg-black rounded-md p-2'>
                <LoadingComponent style='text' />
              </div>
            ) : null}
            {data ? <FoundUsers users={data.users} addFunc={addParticipate} /> : null}
          </div>
          <div className='flex flex-row items-center gap-3 flex-wrap mt-3'>
            {participates.map((participateEmail, index) => (
              <div key={index} className='py-1 px-3 rounded-full bg-blue-400 flex items-center gap-4'>
                <TooltipComponent
                 message='Delete'
                 direction='top'
                >
                  <button 
                  type='button' 
                  className='text-gray-200 cursor-pointer'
                  onClick={() => deleteParticipate(index)}
                  >
                    X
                  </button>
                </TooltipComponent>
                <p className='font-bold text-gray-300'>
                  {participateEmail}
                </p>
              </div>
            ))}
          </div>
          <img
           className='h-16 w-16 m-auto object-cover rounded-full bg-white mt-5' 
           src={noGroupAvatar} 
           alt="group image" 
          />
          <input 
           className='mb-5 cursor-pointer' 
           type="file" 
          />
          <Button
           type='submit'
           bgColor='rgb(45 212 191)'
           color='white'
           paddingSize='1'
           textSize='md'
           borderRadius='10px'
           text={mutation.isLoading ? <LoadingComponent style='circle' /> : "Creat Group"} 
          />
        </form>
      </div>
      {isError && (error instanceof AxiosError) ? (
        <Tefo isError message={error.response?.data.msg} />
      ) : null}
      {mutation.isError && (mutation.error instanceof AxiosError) ? (
        <Tefo isError message={mutation.error.response?.data.msg} />
      ) : null}
      {mutation.isSuccess && mutation.data ? (
        <Tefo isError={false} message='Group have been created!' />
      ) : null}
    </div>
  )
}

export default CreateGroup;