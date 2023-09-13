import React, { useState, useEffect } from 'react';

import { useQuery } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import { io } from 'socket.io-client';

import {
  GroupsNavbar,
  Message,
  SendMessage,
  LoadingComponent,
  Tefo
} from '../../components';

import {
  Optional,
  Void
} from '../../types/types';

import { Socket } from 'socket.io-client/build/esm/socket';

import './group-conversation.css';

interface GroupConversationProps {
  groupID : Optional<string>,
  groupImg : string
  groupName : string,
  groupEmail : string,
  groupCategory : Optional<string>,
  isCurrentUserAdmin : boolean,
  toggleGroupCategory : Void,
  openSettingsMenu : Void,
}

const GroupConversation: React.FC<GroupConversationProps> = ({ groupID, groupImg, groupEmail, groupName, groupCategory, isCurrentUserAdmin, toggleGroupCategory, openSettingsMenu }) => {

  const [socket, setSocket] = useState<Socket | null>(null);

  const [messages, setMessages] = useState<any>(null);
  const [arrivalMessagae, setArrivalMessagae] = useState<any>(null);

  const { isError, error, isLoading, isSuccess, data } = useQuery('groupConversation' ,async () => {
    const res = await axios.get(`http://localhost:8800/api/v1/conversation/${groupID}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    setMessages(res.data.conversations);
    return res.data;
  });

  useEffect(() => {
    setSocket(io('http://localhost:8900'));

    if (socket) {
      socket.emit('addUser', Cookies.get('token'));
      socket.emit('joinRoom', groupID);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('getMessage', (message) => {
        setArrivalMessagae(message);
      });
    }
  });

  useEffect(() => {
    if (arrivalMessagae) {
      setMessages((prevMessages: any) => (
        [
          ...prevMessages,
          arrivalMessagae
        ]
      ));
    }
  }, [arrivalMessagae]);

  console.log({ arrivalMessagae });
  
  // if (isError && error instanceof AxiosError) {
  //   return (
  //     <Tefo isError message={error.response?.data.msg} />
  //   );
  // }

  return (
    <>
      <GroupsNavbar
       category={groupCategory}
       groupID={groupID}
       groupImg={groupImg}
       groupName={groupName}
       groupEmail={groupEmail}
       numberOfMessages={6}
       toggleFunc={toggleGroupCategory}
       openSettingsMenuFunc={openSettingsMenu} 
      />
      {isLoading ? (
        <>
          <div className='sticky top-62'>
            <LoadingComponent style='line' />
          </div>
          <div className='pt-10 flex justify-center'>
            <LoadingComponent style='text' />
          </div>
        </>
      ) : (isError && error instanceof AxiosError) ? (
        <Tefo isError message={error.response?.data.msg} />
      ) : (
        <div className='my-3 mx-4'>
          {messages ? (
            <>
              {messages.map((conversation: any) => (
              <Message
              key={conversation._id}
              own={Cookies.get('username') === conversation.messageSender.username}
              isCurrentUserAdmin={isCurrentUserAdmin}
              senderUsername={conversation.messageSender.username}
              senderImg={conversation.messageSender.userImg}
              messageContent={conversation.messageContent}
              messageAttachments={conversation.messageAttachments}
              createdAt={conversation.createdAt} 
              />
            ))}
            </>
          ) : 
          <>
            {data.conversations.map((conversation: any) => (
              <Message
              key={conversation._id}
              own={Cookies.get('username') === conversation.messageSender.username}
              isCurrentUserAdmin={isCurrentUserAdmin}
              senderUsername={conversation.messageSender.username}
              senderImg={conversation.messageSender.userImg}
              messageContent={conversation.messageContent}
              messageAttachments={conversation.messageAttachments}
              createdAt={conversation.createdAt} 
              />
            ))}
          </>}
        </div>
      )}
      <SendMessage socket={socket} groupID={groupID} clearArrivalMessagae={() => setArrivalMessagae(null)} />
    </>
  )
}

export default GroupConversation;