import React, { useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import {
  EmailComponent,
  GroupsNavbar,
  GroupSettings,
  LoadingComponent,
  Tefo
} from '../../components';

import {
  arrayRepeat,
  range
} from '../../functions';
import { getParamsFromURL } from '../../hooks/useParams';

import { Optional } from '../../types/types';

import './group-emails.css';

const GroupEmails: React.FC = () => {
  
  const queryStrings = getParamsFromURL(document.location.href);

  const { groupCategory } = useParams();

  const [category, setCategory] = useState<Optional<string>>(groupCategory);
  const [emails, setEmails] = useState<null | any>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [statuses, setStatuses] = useState<boolean[]>([]);
  const [emailsIDs, setEmailsIDs] = useState<string[]>([]);
  const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);

  const {isError, error, isLoading, data, refetch} = useQuery('groupEmails', async () => {
    const res = await axios.get(`http://localhost:8800/api/v1/group/emails/${queryStrings?.g_id}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    setStatuses(arrayRepeat([false], res.data.emails.length));
    return res.data;
  }, {
    enabled: !!queryStrings?.g_id
  });

  function toggleCategory (): void {
    setIsSettingMenuOpen(false);

    if (category === 'emails') {
      setCategory('conversation');
    } else {
      setCategory('emails');
    }
  }

  function handleChecked (): void {
    const emailsData = emails || data.emails;;

    if (isChecked) {
      setEmailsIDs([]);
    } else {
      let newEmailsIDs: string[] = [];
      emailsData.forEach((email: any) => {
        newEmailsIDs.push(email._id);
      });
      setEmailsIDs(newEmailsIDs);
    }

    setIsChecked(prevIsChecked => !prevIsChecked);
    setStatuses(arrayRepeat([!isChecked], emailsData.length));
  }

  function handleEmailsChecked (index: number): void {
    const emailsData = emails || data.emails;

    let isChecked = false;
    let newStatuses: boolean[] = [];
    let newEmailsIDs: string[] = emailsIDs;

    for (let i = 0; i < statuses.length; i++) {
      if (i !== index) {
        newStatuses.push(statuses[i]);
      } else {
        if (statuses[i] === true) {
          newStatuses.push(false);
          newEmailsIDs = newEmailsIDs.filter(emailID => emailID !== emailsData[index]._id);
        } else {
          newStatuses.push(true);
          newEmailsIDs.push(emailsData[index]._id);
        }
      }
    }

    for (let i = 0; i < newStatuses.length; i++) {
      if (newStatuses[i] === true) {
        isChecked = true;
      }
    }
    
    setIsChecked(isChecked);
    setStatuses(newStatuses);
    setEmailsIDs(newEmailsIDs);
  }

  function fiterData (emailsIDs: string[]) {
    let newData = emails || data.emails;

    for (const emailID of emailsIDs) {   
      newData = newData.filter((email: any) => email._id !== emailID);
    }

    setEmails(newData);
    setEmailsIDs([]);
    setIsChecked(false);
    setStatuses(arrayRepeat([false], newData.length));
  }

  function openSettingsMenu (): void {
    setIsSettingMenuOpen(true);
  }

  function closeSettingsMenu (): void {
    setIsSettingMenuOpen(false);
  }

  if(isLoading) {
    return (
      <>
      <GroupsNavbar category={category} /> 
      <div className='sticky top-62'>
        <LoadingComponent style='line' />
      </div>
        {range(0, 8, 1).map((idx) => (
          <LoadingComponent
           key={idx}
           style='fallBack' 
          />
        ))}
      </>
    );
  }

  if (isError && (error instanceof AxiosError)) {
    return (
      <Tefo isError message={error.response?.data.msg} />
    );
  }

  return (
    <>      
      <GroupsNavbar
       category={category}
       isEmailsChecked={isChecked}
       handleEmailsChecked={handleChecked} 
       toggleFunc={toggleCategory}
       openSettingsMenuFunc={openSettingsMenu}
       refreshEmails={refetch}
       handleDeleteEmails={() => fiterData(emailsIDs)} 
      />
      {groupCategory === 'emails' ? (
        <div>
          {emails ? (
            <>
              {emails.map((email: any, index: number) => (
                <EmailComponent
                 key={email._id}
                 sender={email.sender.username}
                 subject={email.emailSubject}
                 sendAt={new Date(email.createdAt).toDateString()}
                 content={email.emailContent}
                 handleDeleteEmail={() => fiterData([email._id])}
                 isEmailChecked={statuses[index]}
                 handleEmailChecked={() => handleEmailsChecked(index)}
                />
              ))}
            </>
          ) : 
          (
            <>
              {data.emails.map((email: any, index: number) => (
                <EmailComponent
                 key={email._id}
                 sender={email.sender.username}
                 subject={email.emailSubject}
                 sendAt={new Date(email.createdAt).toDateString()}
                 content={email.emailContent}
                 handleDeleteEmail={() => fiterData([email._id])}
                 isEmailChecked={statuses[index]}
                 handleEmailChecked={() => handleEmailsChecked(index)}
                /> 
              ))}
            </>
          )}
        </div>
      ) :
      groupCategory === 'conversation' ? (
        <div>
          Chat
        </div>
      ) : <Navigate to={`/groups/emails?g_id=${queryStrings?.g_id}`} />}
      {isSettingMenuOpen ? (
        <GroupSettings
         category={category}
         isCurrentUserAdmin 
         closeFunc={closeSettingsMenu}
         toggleFunc={toggleCategory} 
        /> 
      ) : null}
    </>
  )
}

export default GroupEmails;