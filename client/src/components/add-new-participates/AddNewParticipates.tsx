import React, { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import { IoMdCloseCircle } from 'react-icons/io';

import Icon from '../icon/Icon';
import Input from '../input/Input';
import FoundUsers from '../found-users/FoundUsers';
import LoadingComponent from '../loading-component/LoadingComponent';
import Tefo from '../tefo/Tefo';
import TooltipComponent from '../tooltip-component/TooltipComponent';
import Button from '../button/Button';

import {
  Void,
  Event,
  InputElement,
  Optional
} from '../../types/types';

import './add-new-participates.css';

interface AddNewParticipatesProps {
  groupID : Optional<string>,
  closeFunc : Void,
}

const AddNewParticipates: React.FC<AddNewParticipatesProps> = ({ groupID, closeFunc }) => {

  const queryClient = useQueryClient();

  const [searchByEmail, setSearchByEmail] = useState("");
  const [newParticipates, setNewParticipates] = useState<{participateID: string, isAdmin: boolean, participateEmail: string}[]>([]);

  const {isError, error, isLoading, data} = useQuery(['searchByEmail', searchByEmail], async () => {
    const res = await axios.get(`http://localhost:8800/api/v1/user/search?email=${searchByEmail}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data
  }, {
    enabled: searchByEmail.length > 0
  });

  const mutation = useMutation(async (newParticipatesArr: {participateID: string, isAdmin: boolean}[]) => {
    const res = await axios.patch(`http://localhost:8800/api/v1/group/add/${groupID}`, {newParticipates: newParticipatesArr}, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('group');
    }
  });

  function handleSearch (event: Event<InputElement>): void {
    setSearchByEmail(event.target.value);
  }

  function handleSubmit (event: React.FormEvent): void {
    event.preventDefault();

    if (data && data.users.length === 1) {
      setSearchByEmail("");
      setNewParticipates(prevNewParticipates => (
        [...prevNewParticipates, {participateID: data.users[0]._id, isAdmin: false, participateEmail: data.users[0].email}]
      ));
    }
  }

  function addNewParticipate (index: number): void {
    setNewParticipates(prevNewParticipates => (
      [...prevNewParticipates, {participateID: data.users[index]._id, isAdmin: false, participateEmail: data.users[index].email}]
    ));
    setSearchByEmail("");
  }

  function deleteNewParticipate (newParticipateID: string): void {
    setNewParticipates(newParticipates.filter(newParticipate => newParticipate.participateID !== newParticipateID));
  }

  function handleCheckAdmin (newParticipateID: string): void {
    setNewParticipates(newParticipates.map((newParticipate) => {
      if (newParticipate.participateID === newParticipateID) {
        newParticipate.isAdmin = !newParticipate.isAdmin;
      }
      return newParticipate;
    }));
  }

  function handleAddNewParticipatesToGroup (): void {
    let newParticipateArray: {participateID: string, isAdmin: boolean}[] = [];

    for (let i = 0; i < newParticipates.length; i++) {
      newParticipateArray.push({participateID: newParticipates[i].participateID, isAdmin: newParticipates[i].isAdmin});
    }

    mutation.mutate(newParticipateArray);
    closeFunc();
  }

  return (
    <div className='absolute top-60 left-1/2 bg-main-dark-bg rounded-md w-full p-2'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-xl'>
          Add new participates
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
       onSubmit={handleSubmit}
       className='mt-3'
      >
        <Input
         type='text'
         id='searchByEmail'
         label='Search by email'
         value={searchByEmail}
         customFunc={handleSearch} 
        />
        {isLoading ? (
          <div className='mt-2 bg-black rounded-md p-2'>
            <LoadingComponent style='text' />
          </div>
        ) : null}
        {data ? <FoundUsers users={data.users} addFunc={addNewParticipate} /> : null}
      </form>
      <div className='flex flex-row items-center gap-3 flex-wrap mt-3'>
        {newParticipates.map((newParticipate, index) => (
          <div key={index} className='py-1 px-3 rounded-full bg-blue-400 flex items-center gap-4'>
            <TooltipComponent
             message='Delete'
             direction='top'
            >
              <button 
               type='button' 
               className='text-gray-200 cursor-pointer'
               onClick={() => deleteNewParticipate(newParticipate.participateID)}
              >
                X
              </button>
            </TooltipComponent>
            <p className='font-bold text-gray-300'>
              {newParticipate.participateEmail}
            </p>
            <TooltipComponent
             message='Make admin'
             direction='top'
            >
              <input 
               type="checkbox"
               checked={newParticipate.isAdmin}
               className='cursor-pointer'
               onChange={() => handleCheckAdmin(newParticipate.participateID)} 
              />
            </TooltipComponent>
          </div>
        ))}
      </div>
      {newParticipates.length > 0 ? <div className='mt-3'><Button
       type='button'
       bgColor='rgb(34 197 94)'
       color='white'
       text={mutation.isLoading ? <LoadingComponent style='circle' /> : "Add Participates"}
       textSize='md'
       paddingSize='1'
       borderRadius='10px'
       customFunc={handleAddNewParticipatesToGroup} 
      /></div> : null}
      {isError && (error instanceof AxiosError) ? (
        <Tefo isError message={error.response?.data.msg} />
      ) : null}
      {mutation.isError && (mutation.error instanceof AxiosError) ? (
        <Tefo isError message={mutation.error.response?.data.msg} />
      ) : null}
      {mutation.isSuccess && mutation.data ? (
        <Tefo isError={false} message="New participates have been added!" />
      ) : null}
    </div>
  )
}

export default AddNewParticipates;