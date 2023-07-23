import React from 'react';

import { useMutation, useQuery } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import {
  LoadingComponent,
  Tefo,
  EmailComponent,
  EmailsNavbar
} from '../../components';

import { range } from '../../functions';

import './sent.css';

const Sent: React.FC = () => {

  const {isError, error, isLoading, data, refetch} = useQuery('sentEmails', async () => {
    const res = await axios.get('http://localhost:8800/api/v1/email/sent', { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  });

  const mutation = useMutation(async (sentEmailID) => {
    const res = await axios.delete(`http://localhost:8800/api/v1/email/${sentEmailID}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data; 
  }, {
    onSuccess: () => {
      alert('Deleted!');
    }
  });

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
      />
      {data.sentEmails.map((sentEmail: any) => (
        <EmailComponent
         key={sentEmail._id}
         sendTo={sentEmail.to}
         subject={sentEmail.emailSubject}
         sendAt={new Date(sentEmail.createdAt).toDateString()}
         content={sentEmail.emailContent}
         handleDeleteEmail={() => mutation.mutate(sentEmail._id)}
         isEmailChecked={false}
        />
      ))}
    </div>
  )
}

export default Sent;