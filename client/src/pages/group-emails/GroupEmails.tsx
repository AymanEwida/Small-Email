import React, { useState } from 'react';

import { useQuery } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import {
  Tefo,
  EmailComponent,
  GroupsNavbar,
  LoadingComponent
} from '../../components';

import { arrayRepeat } from '../../functions';

import {
  Void,
  Optional
} from '../../types/types';

import './group-emails.css';

interface GroupEmailsProps {
  groupID : Optional<string>,
  groupCategory : Optional<string>,
  toggleGroupCategory : Void,
  openSettingsMenu : Void,
}

const GroupEmails: React.FC<GroupEmailsProps> = ({ groupID, groupCategory, toggleGroupCategory, openSettingsMenu }) => {

  const [emails, setEmails] = useState<null | any>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [statuses, setStatuses] = useState<boolean[]>([]);
  const [emailsIDs, setEmailsIDs] = useState<string[]>([]);

  const {isError, error, isLoading, data, refetch} = useQuery('groupEmails', async () => {
    const res = await axios.get(`http://localhost:8800/api/v1/group/emails/${groupID}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    setStatuses(arrayRepeat([false], res.data.emails.length));
    return res.data;
  }, {
    enabled: !!groupID
  });

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

  if (isLoading) {
    return (
      <>
        <GroupsNavbar groupID={groupID} category={groupCategory} /> 
        <div className='sticky top-62'>
          <LoadingComponent style='line' />
        </div>
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
       category={groupCategory}
       groupID={groupID}
       isEmailsChecked={isChecked}
       handleEmailsChecked={handleChecked} 
       toggleFunc={toggleGroupCategory}
       openSettingsMenuFunc={openSettingsMenu}
       refreshEmails={refetch}
       handleDeleteEmails={() => fiterData(emailsIDs)} 
      />
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
    </>
  )
}

export default GroupEmails;