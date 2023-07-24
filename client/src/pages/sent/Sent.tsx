import React, { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import {
  LoadingComponent,
  Tefo,
  EmailComponent,
  EmailsNavbar
} from '../../components';

import {
  range,
  arrayRepeat
} from '../../functions';

import './sent.css';

const Sent: React.FC = () => {

  const queryClient = useQueryClient();

  const [isChecked, setIsChecked] = useState(false);
  const [statuses, setStatuses] = useState<boolean[]>([]);
  const [sentEmailsIDs, setSentEmailsIDs] = useState<string[]>([]);

  const {isError, error, isLoading, data, refetch} = useQuery('sentEmails', async () => {
    const res = await axios.get('http://localhost:8800/api/v1/email/sent', { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    setStatuses(arrayRepeat([false], res.data.sentEmails.length));
    return res.data;
  });

  const mutation = useMutation(async (sentEmailID: string) => {
    const res = await axios.delete(`http://localhost:8800/api/v1/email/${sentEmailID}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data; 
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('sentEmails');
    }
  });

  
  function handleChecked (): void {
    if (isChecked) {
      setSentEmailsIDs([]);
    } else {
      let newEmailsIDs: string[] = [];
      data.sentEmails.forEach((email: any) => {
        newEmailsIDs.push(email._id);
      });
      setSentEmailsIDs(newEmailsIDs);
    }

    setIsChecked(prevIsChecked => !prevIsChecked);
    setStatuses(arrayRepeat([!isChecked], data.sentEmails.length));
  }

  function handleEmailsChecked (index: number): void {
    let isChecked = false;
    let newSentStatuses: boolean[] = [];
    let newSentEmailsIDs: string[] = sentEmailsIDs;

    for (let i = 0; i < statuses.length; i++) {
      if (i !== index) {
        newSentStatuses.push(statuses[i]);
      } else {
        if (statuses[i] === true) {
          newSentStatuses.push(false);
          newSentEmailsIDs = newSentEmailsIDs.filter(emailID => emailID !== data.sentEmails[index]._id);
        } else {
          newSentStatuses.push(true);
          newSentEmailsIDs.push(data.sentEmails[index]._id);
        }
      }
    }

    for (let i = 0; i < newSentStatuses.length; i++) {
      if (newSentStatuses[i] === true) {
        isChecked = true;
      }
    }
    
    setIsChecked(isChecked);
    setStatuses(newSentStatuses);
    setSentEmailsIDs(newSentEmailsIDs);
  }

  async function handleDeleteSentEmails () {
    let arrOfPromises = [];

    for (const sentEmailID of sentEmailsIDs) {
      arrOfPromises.push(mutation.mutateAsync(sentEmailID));
    }

    await Promise.all(arrOfPromises);

    setIsChecked(false);
    setSentEmailsIDs([]);
    setStatuses(arrayRepeat([false], data.sentEmails.length));
  }

  if(isLoading) {
    return (
      <>
      <EmailsNavbar /> 
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
       handleDeleteEmails={handleDeleteSentEmails} 
      />
      {data.sentEmails.map((sentEmail: any, index: number) => (
        <EmailComponent
         key={sentEmail._id}
         sendTo={sentEmail.to}
         subject={sentEmail.emailSubject}
         sendAt={new Date(sentEmail.createdAt).toDateString()}
         content={sentEmail.emailContent}
         handleDeleteEmail={() => mutation.mutate(sentEmail._id)}
         isEmailChecked={statuses[index]}
         handleEmailChecked={() => handleEmailsChecked(index)}
        />
      ))}
    </div>
  )
}

export default Sent;