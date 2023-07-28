import React, { useState } from 'react';

import { useMutation, useQueryClient } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import { IoMdCloseCircle } from 'react-icons/io';

import Icon from '../icon/Icon';
import Input from '../input/Input';
import Textarea from '../textarea/Textarea';
import Button from '../button/Button';
import LoadingComponent from '../loading-component/LoadingComponent';
import Tefo from '../tefo/Tefo';

import noGroupAvatar from '../../assests/noGroupAvatar.png';

import {
  Void,
  Event,
  InputElement,
  TextAreaElement,
  Optional
} from '../../types/types';

import './update-group.css';

interface UpdateGroupProps {
  groupID : Optional<string>,
  groupCredential : string,
  groupCredentialValue : string,
  closeFunc : Void
}

const UpdateGroup: React.FC<UpdateGroupProps> = ({ groupID, groupCredential, groupCredentialValue, closeFunc }) => {

  const queryClient = useQueryClient();

  const [newCredential, setNewCredential] = useState(groupCredentialValue);
  const [isEqual, setIsEqual] = useState(false);

  const mutation = useMutation(async (formData: {groupName: string} | {groupEmail: string} | {groupDesc: string} | {groupImg: string}) => {
    const res = await axios.patch(`http://localhost:8800/api/v1/group/${groupID}`, formData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('group');
    }
  });

  return (
    <div className='absolute top-60 left-1/2 bg-main-dark-bg rounded-md w-full p-2'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-xl'>
          {groupCredential}
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
      {groupCredential.split(" ")[1].toLocaleLowerCase() === "name" ? (
        <form 
         className='my-3 flex flex-col gap-3'
         onSubmit={(event: React.FormEvent) => {
          event.preventDefault();

          if (newCredential !== groupCredentialValue) {
            mutation.mutate({groupName: newCredential});
            closeFunc();
          } else {
            setIsEqual(true);
          }
         }}
        >
          <Input
           type='text'
           id='changeName'
           label='New Name'
           isRequired
           value={newCredential}
           customFunc={(event: Event<InputElement>) => setNewCredential(event.target.value)}
          />
          <Button
           type='submit'
           bgColor='rgb(34 197 94)'
           color='white'
           text={mutation.isLoading ? <LoadingComponent style='circle' /> : groupCredential}
           textSize='md'
           paddingSize='1'
           borderRadius='10px'
          />
        </form>
      ) : groupCredential.split(" ")[1].toLocaleLowerCase() === "email" ? (
        <form 
         className='my-3 flex flex-col gap-3'
         onSubmit={(event: React.FormEvent) => {
          event.preventDefault();

          if (newCredential !== groupCredentialValue) {
            mutation.mutate({groupEmail: newCredential});
            closeFunc();
          } else {
            setIsEqual(true);
          }
         }}
        >
          <Input
           type='text'
           id='changeEmail'
           label='New Email'
           isRequired
           value={newCredential}
           customFunc={(event: Event<InputElement>) => setNewCredential(event.target.value)}
          />
          <Button
           type='submit'
           bgColor='rgb(34 197 94)'
           color='white'
           text={mutation.isLoading ? <LoadingComponent style='circle' /> : groupCredential}
           textSize='md'
           paddingSize='1'
           borderRadius='10px'
          />
        </form>
      ) : groupCredential.split(" ")[1].toLocaleLowerCase() === "description" ? (
        <form 
         className='my-3 flex flex-col gap-3'
         onSubmit={(event: React.FormEvent) => {
          event.preventDefault();

          if (newCredential !== groupCredentialValue) {
            mutation.mutate({groupDesc: newCredential});
            closeFunc();
          } else {
            setIsEqual(true);
          }
         }}
        >
          <Textarea
           id='changeDesc'
           label='New Description'
           value={newCredential}
           isRequired
           customFunc={(event: Event<TextAreaElement>) => setNewCredential(event.target.value)} 
          />
          <Button
           type='submit'
           bgColor='rgb(34 197 94)'
           color='white'
           text={mutation.isLoading ? <LoadingComponent style='circle' /> : groupCredential}
           textSize='md'
           paddingSize='1'
           borderRadius='10px'
          />
        </form>
      ) : groupCredential.split(" ")[1].toLocaleLowerCase() === "image" ? (
        <form 
         className='my-3 flex flex-col gap-3'
         onSubmit={(event: React.FormEvent) => {
          event.preventDefault();

          console.log("I submitted wow!");
         }}
        >
          <img
           className='h-16 w-16 m-auto bg-white rounded-full object-cover' 
           src={noGroupAvatar} 
           alt="group image" 
          />
          <input 
           type="file" 
          />
          <Button
           type='submit'
           bgColor='rgb(34 197 94)'
           color='white'
           text={mutation.isLoading ? <LoadingComponent style='circle' /> : groupCredential}
           textSize='md'
           paddingSize='1'
           borderRadius='10px'
          />
        </form>
      ) : null}
      <div>
      {isEqual ? (
        <Tefo isError message='Please enter a new value!' />
      ) : null}
      {mutation.isError && (mutation.error instanceof AxiosError) ? (
        <Tefo isError message={mutation.error.response?.data.msg} />
      ) : null}
      {mutation.isSuccess && mutation.data ? (
        <Tefo isError={false} message={groupCredential.split(" ")[1] + " has been changed!"} />
      ) : null}
      </div>
    </div>
  )
}

export default UpdateGroup;