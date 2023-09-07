import React from 'react';

import noAvatar from '../../assests/noAvatar.png';

import './message.css';

type messageAttachment = {
  _id : string;
  filename : string;
  filePath : string;
}

interface MessageProps {
  own : boolean,
  senderUsername : string,
  senderImg : string,
  messageContent : string,
  messageAttachments : messageAttachment[],
  createdAt : string 
}

const Message: React.FC<MessageProps> = ({ own, senderUsername, senderImg, messageContent, messageAttachments, createdAt }) => {
  return (
    <div className={`flex gap-2 justify-start ${own ? 'flex-row' : 'flex-row-reverse'} mb-5`}>
      {!own ? <img
       className='rounded-full object-cover h-8 w-8'
       src={noAvatar}
       alt='senderImg'
      /> : null}
      <div className={`rounded-lg ${own ? 'bg-green-600' : 'bg-slate-600'} p-2`}>
        <div className='flex items-center justify-between'>
          <p className='text-red-500'>
            {own ? "Me" : senderUsername}
          </p>
          <p className='text-black text-sm'>
            {new Date(createdAt).toLocaleDateString() + " " + new Date(createdAt).toTimeString().split(' ')[0]}
          </p>
        </div>
        <div>
          {messageAttachments.map((messageAttachment) => (
            <img
             key={messageAttachment._id}
             className='w-full rounded-md h-32 object-contain' 
             src={messageAttachment.filePath} 
             alt="test" 
            />
          ))}
          <p className='text-white'>
            {messageContent}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Message;