import React, { useState } from 'react';

import { AiOutlineFullscreen, AiFillDelete, AiOutlineFullscreenExit } from 'react-icons/ai';
import { RiDeleteBack2Fill } from 'react-icons/ri';

import Icon from '../icon/Icon';
import Button from '../button/Button';
import Input from '../input/Input';

import {
  EventInputElement, 
  FormEvent,
  Void
} from '../../types/types';

import './send-email.css';

interface SendEmailProps {
  closeSendEmail: Void
}

const SendEmail: React.FC<SendEmailProps> = ({ closeSendEmail }) => {

  const [to, setTo] = useState('');
  const [tos, setTos] = useState('');
  const [toss, setToss] = useState('');
  const [fullScreen, setFullScreen] = useState(false);

  function handleFullScreen (): void {
    setFullScreen(prevFullScreen => !prevFullScreen);
  }

  return (
    <div className={fullScreen ? 'grid place-content-center' : 'absolute bottom-2 right-10'}>
    <form
      className={`w-400 ${fullScreen ? 'w-500 lg:w-800' : ''} bg-black rounded-md overflow-hidden`}
      onSubmit={(event: FormEvent) => {
        event.preventDefault();

        console.log('I submited wow!');
      }}
    >
      <div className='flex justify-between items-center w-full bg-gray-700 px-6 py-1'>
        <p className='font-semibold'>
          New Email
        </p>
        <div>
          <Icon
           title={`${fullScreen ? 'Exit' : 'Enter'} Full Screen`}
           iconPosition='bottom'
           color='white'
           bgColor='bg-gray-400'
           icon={fullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
           customFunc={handleFullScreen} 
          />
          <Icon
           title='Delete'
           iconPosition='bottom'
           color='white'
           bgColor='bg-gray-400'
           icon={<RiDeleteBack2Fill />}
           customFunc={closeSendEmail} 
          />
        </div>
      </div>
      <div className='flex flex-col gap-3 p-3'>
        <Input
         type='text'
         id='recipients'
         label='Recipients'
         value={to}
         customFunc={(event: EventInputElement) => setTo(event.target.value)} 
        />
        <Input
         type='text'
         id='subject'
         label='Subject'
         value={toss}
         customFunc={(event: EventInputElement) => setToss(event.target.value)} 
        />
        <textarea 
         cols={30} 
         rows={10}
         className='text-white bg-neutral-700 w-full outline-none p-2 rounded-md'
         value={tos}
         placeholder='Content'
         onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setTos(event.target.value)} 
        />
      </div>
      <div className='flex justify-between items-center px-4 py-2'>
        <Button
         type='submit'
         textSize='md'
         text='Send Email'
         borderRadius='10px'
         bgColor='rgb(96 165 250)'
         paddingSize='2'
         color='white' 
        />
        <Icon
         title='Delete'
         iconPosition='top'
         color='white'
         bgColor='bg-gray-400'
         icon={<AiFillDelete />}
         customFunc={closeSendEmail}
        />
      </div>
    </form>
  </div>
  )
}

export default SendEmail;