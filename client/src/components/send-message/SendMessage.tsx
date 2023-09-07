import React, { useState } from 'react';

import { BiImageAdd, BiVideoPlus } from 'react-icons/bi';
import { MdOutlineAttachFile } from 'react-icons/md';
import { AiOutlineSend } from 'react-icons/ai';

import Cookies from 'js-cookie';

import Button from '../button/Button';
import Icon from '../icon/Icon';
import Input from '../input/Input';
import TooltipComponent from '../tooltip-component/TooltipComponent';

import {
  Event,
  InputElement
} from '../../types/types';

import './send-message.css';

const SendMessage: React.FC = () => {

  const [messageText, setMessageText] = useState('');

  function handleChangeMessageText (event: Event<InputElement>): void {
    setMessageText(event.target.value)
  }

  function handleSendMessage (event: React.FormEvent): void {
    event.preventDefault()

    console.log('I submited wow!');
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