import React, { useState, useEffect } from 'react';

import { useQuery } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import {
  LoadingComponent,
  EmailComponent,
  Tefo,
  EmailsNavbar
} from '../../components';

import {
  range,
  arrayRepeat
} from '../../functions';

import {
  Event,
  InputElement
} from '../../types/types';

import './inbox.css';

const Inbox: React.FC = () => {

  // const emailsValueFromLocalStorage = localStorage.getItem('inboxEmails');

  // let emailsValue = null;

  // if (typeof emailsValueFromLocalStorage === 'string') {
  //   emailsValue = JSON.parse(emailsValueFromLocalStorage);
  // }

  const [emails, setEmails] = useState<null | any>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [statuses, setStatuses] = useState(arrayRepeat([false], 5));
  const [emailsIDs, setEmailsIDs] = useState<string[]>([]);

  const {isError, error, isLoading, data, refetch} = useQuery('inboxEmails', async () => {
    const res = await axios.get('http://localhost:8800/api/v1/email', { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data
  });

  function handleChecked (): void {
    const emailsData = emails || data.emails;

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
    setStatuses(arrayRepeat([!isChecked], 5));
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
    handleChecked();
  }

  // useEffect(() => {
  //   localStorage.setItem('inboxEmails', JSON.stringify(emails));
  // }, [emails]);

  if(isLoading) {
    return (
      <>
      <EmailsNavbar
      /> 
      <div className='sticky top-12'>
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
    <div>
      <EmailsNavbar
       refreshEmails={refetch}
       isEmailsChecked={isChecked}
       handleEmailsChecked={handleChecked}
       handleDeleteEmails={() => fiterData(emailsIDs)}
      />
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
  )
}

export default Inbox;