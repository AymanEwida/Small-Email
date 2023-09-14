import React, { useState } from 'react';

import { BiImageAdd, BiVideoPlus } from 'react-icons/bi';
import { MdOutlineAttachFile } from 'react-icons/md';
import { AiOutlineSend } from 'react-icons/ai';

import { useMutation } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import Button from '../button/Button';
import Icon from '../icon/Icon';
import Input from '../input/Input';
import TooltipComponent from '../tooltip-component/TooltipComponent';

import {
  Event,
  InputElement,
  Optional,
  Void
} from '../../types/types';

import { Socket } from 'socket.io-client/build/esm/socket';

import './send-message.css';

type MessageSender = {
  _id: Optional<string>;
  username: Optional<string>;
  userImg: Optional<string>;
}

interface SendMessageProps {
  socket: Socket | null,
  groupID: Optional<string>,
  messageSender: MessageSender,
  clearArrivalMessagae: Void,
}

const SendMessage: React.FC<SendMessageProps> = ({ socket, groupID, messageSender, clearArrivalMessagae }) => {

  const [messageText, setMessageText] = useState('');

  const mutation = useMutation(async (formData: { messageContent: string, messageAttachments?: {filename: string, mimeType: string, filePath: string}[] }) => {
    const res = await axios.post(`http://localhost:8800/api/v1/conversation/send-message/${groupID}`, formData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      socket?.emit('sendMessage', {message: data.displayConversation, isFinished: true});
      setMessageText('');
    }
  });

  function handleChangeMessageText (event: Event<InputElement>): void {
    setMessageText(event.target.value)
  }

  function generateTemMessages () {
    return {
      _id: "1",
      groupID,
      messageSender,
      messageContent: messageText,
      messageAttachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    }
  } 

  function handleSendMessage (event: React.FormEvent): void {
    event.preventDefault()

    clearArrivalMessagae();

    if (messageText) {
      socket?.emit('sendMessage', {message: generateTemMessages(), isFinished: false});
      mutation.mutate({messageContent: messageText});
    }
  }

  return (
    <div className='sticky top-full left-0 w-full bg-black px-5 py-3'>
      <form 
       className='flex items-center gap-5 w-full'
       onSubmit={handleSendMessage}
      >
        <span className='w-full'>
          <Input
           id='messageText'
           label={`What's in your mind ${Cookies.get('username')?.split(' ')[0]}...`}
           type='text'
           value={messageText}
           customFunc={handleChangeMessageText}
          />
        </span>
        <div className='flex items-center'>
          <Icon
           title='Add Image'
           iconPosition='top'
           color='white'
           bgColor='bg-transparent'
           textSize='md'
           icon={<BiImageAdd />}
          />
          <Icon
           title='Add Video'
           iconPosition='top'
           color='white'
           bgColor='bg-transparent'
           textSize='md'
           icon={<BiVideoPlus />}
          />
          <Icon
           title='Add File'
           iconPosition='top'
           color='white'
           bgColor='bg-transparent'
           textSize='md'
           icon={<MdOutlineAttachFile />}
          />
        </div>
        <TooltipComponent
         message='Send'
        >
          <Button
           type='submit'
           color='rgb(96 165 250)'
           bgColor='transparent'
           text={<AiOutlineSend />}
           paddingSize='1'
           textSize='2xl'
          />
        </TooltipComponent>
      </form>
    </div>
  )
}

export default SendMessage;