import React from 'react';

import { useMutation } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import { AiFillDelete, AiOutlineDownload } from 'react-icons/ai';
import { BiTime, BiCheckDouble } from 'react-icons/bi';

import Icon from '../icon/Icon';

import noAvatar from '../../assests/noAvatar.png';

import { Optional } from '../../types/types';

import { Socket } from 'socket.io-client/build/esm/socket';

import './message.css';

type messageAttachment = {
  _id : string;
  filename : string;
  filePath : string;
  mimeType : string;
}

interface MessageProps {
  own : boolean,
  isCurrentUserAdmin : boolean,
  senderUsername : string,
  senderImg : string,
  messageContent : string,
  messageAttachments : messageAttachment[],
  updatedAt : string,
  isFinished ?: boolean,
  groupID : Optional<string>,
  messageID : string,
  socket : Socket | null, 
}

const Message: React.FC<MessageProps> = ({ own, isCurrentUserAdmin, senderUsername, senderImg, messageContent, messageAttachments, updatedAt, isFinished, groupID, messageID, socket }) => {

  function handleDeleteMessage () {
    socket?.emit('deleteMessage', {messageID, groupID});
    mutation.mutate();
  }
  
  const mutation = useMutation(async () => {
    const res = await axios.delete(`http://localhost:8800/api/v1/conversation/delete-message/${messageID}?groupID=${groupID}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }); 

  return (
    <div className={`flex gap-2 justify-start ${own ? 'flex-row' : 'flex-row-reverse'} mb-5`}>
      {!own ? <img
       className='rounded-full object-cover h-8 w-8'
       src={senderImg ? senderImg : noAvatar}
       alt='senderImg'
      /> : null}
      <div className={`rounded-lg ${own ? 'bg-green-600' : 'bg-slate-600'} p-2`}>
        <div className='flex items-center justify-between'>
          <p className='text-red-500'>
            {own ? "Me" : senderUsername}
          </p>
          <p className='text-black text-sm'>
            {new Date(updatedAt).toLocaleDateString() + " " + new Date(updatedAt).toTimeString().split(' ')[0]}
          </p>
        </div>
        <div className='w-96 overflow-hidden'>
          {messageAttachments.map((messageAttachment) => (
            <div key={messageAttachment._id}>
              {messageAttachment.mimeType.startsWith('image/') ? (
                <div className='relative'>
                  <img
                   className='w-full rounded-md h-32 object-contain my-4' 
                   src={messageAttachment.filePath} 
                   alt="message image" 
                  />
                  <a href={messageAttachment.filePath} className='absolute top-1 left-1 text-white'><AiOutlineDownload /></a>
                </div> 
              ) : messageAttachment.mimeType.startsWith('video/') ? (
                <video
                 className='w-full rounded-md h-32 object-contain my-4' 
                 src={messageAttachment.filePath} 
                 controls
                />
              ) : messageAttachment.mimeType.startsWith('file/') ? (
                <a 
                 href={messageAttachment.filePath} 
                 className='rounded-full bg-blue-500 w-1/2 text-ellipsis text-gray-200 p-2 my-4'
                >
                  {messageAttachment.filename}
                </a>
              ) : null}
            </div>
          ))}
          <p className='text-white mt-4'>
            {messageContent}
          </p>
        </div>
        {(own || isCurrentUserAdmin) && messageContent != "Message has been deleted" ? (
          <div className='float-right'>
            <Icon
             title='Delete'
             iconPosition='bottom'
             icon={<AiFillDelete />}
             textSize='md'
             color='black'
             bgColor='bg-transparent'
             customFunc={handleDeleteMessage} 
            />
          </div>
        ) : null}
        {typeof isFinished === "boolean" && own ? <div className={`float-left ${own ? 'text-blue-700' : 'text-blue-400'} mt-2`}>
          {isFinished ? <BiCheckDouble /> : <BiTime />}
        </div> : null}
      </div>
    </div>
  )
}

export default Message;