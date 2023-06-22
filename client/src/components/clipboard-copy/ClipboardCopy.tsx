import React, { useState } from 'react';

import { IoCopyOutline } from 'react-icons/io5';
import { TbCopyOff } from 'react-icons/tb';

import Icon from '../icon/Icon';

import './clipboard-copy.css';

interface ClipboardCopyProps {
  copyText : string,
}

const ClipboardCopy: React.FC<ClipboardCopyProps> = ({ copyText }) => {

  const [isCopied, setIsCopied] = useState(false);

  async function copyToClipboard (text: string): Promise<boolean | void> {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  function handleCopyClick (): void {
    copyToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500)
      })
      .catch((error) => {
        console.log(error);
      });
  } 

  return (
    <div className='flex items-center gap-2 outline-1 outline outline-color rounded-md px-2'>
      <input 
       type="text" 
       readOnly 
       value={copyText}
       className='bg-transparent text-gray-400 outline-none border-r-1' 
      />
      <Icon
       title={isCopied ? 'Copied!' :'Copy'}
       iconPosition='top'
       color='white'
       bgColor='bg-transparent'
       textSize='md'
       icon={isCopied ? <TbCopyOff /> : <IoCopyOutline />}
       customFunc={handleCopyClick}
      />
    </div>
  )
}

export default ClipboardCopy;