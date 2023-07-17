import React, { useState } from 'react';

import { AiOutlineFullscreen, AiFillDelete, AiOutlineFullscreenExit, AiOutlineDeliveredProcedure } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { BiImageAdd } from 'react-icons/bi';
import { FiLink2 } from 'react-icons/fi';
import { MdOutlineAttachFile } from 'react-icons/md';
import { ImTextColor } from 'react-icons/im';

import Icon from '../icon/Icon';
import Button from '../button/Button';
import Input from '../input/Input';

import { 
  FormEvent,
  Void,
  Event,
  InputElement,
  TextAreaElement
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
    <div className='flex justify-center items-center'>
      <div className={`absolute ${fullScreen ? 'top-24' : 'bottom-2 right-2'} z-index`}>
        <form
          className={`w-400 ${fullScreen ? 'w-500 lg:w-800' : ''} bg-black rounded-md overflow-hidden`}
          onSubmit={(event: FormEvent) => {
            event.preventDefault();

            console.log('I submited wow!');
          }}
        >
        <div className='flex justify-between items-center w-full bg-gray-700 px-10 py-1'>
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
            title='Delete & Save'
            iconPosition='bottom'
            color='white'
            bgColor='bg-gray-400'
            icon={<AiOutlineDeliveredProcedure />}
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
          customFunc={(event: Event<InputElement>) => setTo(event.target.value)} 
          />
          <Input
          type='text'
          id='subject'
          label='Subject'
          value={toss}
          customFunc={(event: Event<InputElement>) => setToss(event.target.value)} 
          />
          {/* <div 
           style={{ minHeight: '196px', maxHeight: '320px' }} 
           className='h-72 outline-none focus:border-none px-1' 
           role='textbox' 
           aria-multiline="true" 
           tabIndex={1} 
           aria-label='body-content'
           contentEditable="true" 
           aria-controls=':tp' 
           aria-owns=':tp' 
           spellCheck='false'
           onClick={(e) => console.log(e)}
          >
            <br />
          </div> */}
          <textarea 
          cols={30} 
          rows={10}
          style={{ resize: 'none' }}
          className='bg-transparent w-full outline-none p-2'
          value={tos}
          placeholder=' '
          onChange={(event: Event<TextAreaElement>) => setTos(event.target.value)}
          />
        </div>
        {/* <div className='px-3 py-2 flex flex-row gap-3 overflow-x-auto'>
          <div className='flex items-center pr-2 rounded-full bg-blue-500'>
            <Icon
             title='Delete'
             textSize='2xl'
             iconPosition='left'
             icon={<TiDelete />}
             color='white'
             bgColor='bg-transparent' 
            />
            <p className='text-gray-200'>
              index.pptx
            </p>
          </div>
        </div> */}
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
          <div className='flex items-center'>
            <Icon
             title='Design Possibilities'
             iconPosition='top'
             color='white'
             textSize='md'
             bgColor='bg-gray-400'
             icon={<ImTextColor />}
            />
            <Icon
             title='Add Image'
             iconPosition='top'
             color='white'
             textSize='md'
             bgColor='bg-gray-400'
             icon={<BiImageAdd />}
            />
            <Icon
             title='Add Link'
             iconPosition='top'
             color='white'
             textSize='md'
             bgColor='bg-gray-400'
             icon={<FiLink2 />}
            />
            <Icon
             title='Add File'
             iconPosition='top'
             color='white'
             textSize='md'
             bgColor='bg-gray-400'
             icon={<MdOutlineAttachFile />}
            />
          </div>
          <Icon
           title='Remove'
           iconPosition='top'
           color='white'
           textSize='md'
           bgColor='bg-gray-400'
           icon={<AiFillDelete />}
           customFunc={closeSendEmail}
          />
        </div>
      </form>
    </div>
  </div>
  )
}

export default SendEmail;