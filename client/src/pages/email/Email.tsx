import React, { useState } from 'react'

import { Navigate, useParams, useNavigate } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import {
  EmailNavbar,
  EmailLayout,
  TransferEmail,
  ResponeEmail,
  LoadingComponent,
  Tefo
} from '../../components';

import { getParamsFromURL } from '../../hooks/useParams';

import {
  buttons
} from './buttonsData';

import './email.css';

const Email: React.FC = () => {

  const queryStrings = getParamsFromURL(document.location.href);

  const { emailCategory } = useParams();

  const queryClient = useQueryClient();

  const [emailMethods, setEmailMethods] = useState({
    isTransferShow: false,
    isResponeShow: false
  });

  const history = useNavigate();

  const {isError, error, isLoading, data} = useQuery("email", async () => {
    const res = await axios.get(`http://localhost:8800/api/v1/email/${queryStrings.e_id}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    enabled: !!queryStrings.e_id
  });

  const mutation = useMutation(async (sentEmailID: string) => {
    const res = await axios.delete(`http://localhost:8800/api/v1/email/${sentEmailID}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data; 
  }, {
    onSuccess: () => {
      history('/sent');
      queryClient.invalidateQueries('sentEmails');
    }
  });

  function handleShowEmailMethod (emailMethod: string): void {
    if (emailMethod === 'transfer') {
      setEmailMethods(prevEmailMethods => (
        {
          isTransferShow: !prevEmailMethods.isTransferShow,
          isResponeShow: false
        }
      ));
    } else if (emailMethod === 'respone') {
      setEmailMethods(prevEmailMethods => (
        {
          isTransferShow: false,
          isResponeShow: !prevEmailMethods.isResponeShow
        }
      ));
    }
  }

  function handleCloseEmailMethod (): void {
    setEmailMethods({
      isTransferShow: false,
      isResponeShow: false
    });
  }

  if (isLoading) {
    return (
      <>
        <EmailNavbar
         category={emailCategory} 
        />
        <div className='relative'>
          <div className='sticky top-0'>
            <LoadingComponent style='line' />
          </div>
          <div className='p-4 w-full'>
            <div className='rounded-md w-24 h-4 bg-gray-400' />
            <div className='rounded-md w-72 lg:w-760 h-4 bg-gray-400 mt-5' />
            <div className='mt-4 rounded-md w-64 lg:w-500 h-4 bg-gray-400' />
            <div className='mt-10 rounded-md w-full h-96 bg-gray-400' />
          </div>
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
    (emailCategory === 'sent' && data.email.sender.username !== Cookies.get('username')) ? (
      <>
        <h1 className='text-red-400 text-xl text-center pt-24'>
          You can't see others email in sent mode.
        </h1>
      </>
    ) : <>
      <EmailNavbar
       category={emailCategory}
       groupID={queryStrings.g_id}
       deleteEmailFunc={() => mutation.mutate(data.email._id)} 
      />
      <div className='px-4 mb-4'>
        <EmailLayout
         subject={data.email.emailSubject}
         sender={{username: data.email.sender.username, email: data.email.sender.email, userImg: data.email.sender.userImg}}
         recipients={emailCategory === 'inbox' || emailCategory === 'groups' ? [{recipientEmail: `Me<${Cookies.get('email')}>`}] : data.email.to.map((recipient: any) => ({recipientEmail:recipient.user.email}))}
         content={eval('`' + data.email.emailContent + '`')}
         files={data.email.files} 
        />
        {emailCategory === 'inbox' || emailCategory === 'groups' ? (
          <div className='grid grid-cols-2 gap-3 w-fit'>
            {buttons.map((button, index) => (
              <button
               key={index}
               type='button'
               className='flex gap-2 items-center p-2 text-md mt-3 hover:drop-shadow-xl rounded-md bg-green-400'
               onClick={() => handleShowEmailMethod(button.functionCategory)}
              >
                <span>
                  {button.icon}
                </span>
                {button.text}
              </button>
            ))}
          </div>
        ) :
        emailCategory === 'sent' ? (
          <button
           type='button'
           className='flex gap-2 items-center p-2 text-md mt-3 hover:drop-shadow-xl rounded-md bg-green-400'
           onClick={() => handleShowEmailMethod('transfer')}
          >
           <span>
             {buttons[0].icon}
           </span>
           {buttons[0].text}
         </button>
        ) : <Navigate to='/inbox' />}
      </div>
      {emailMethods.isTransferShow ? (
        <div className='bg-main-dark-bg rounded-md p-2 mx-5 mb-4'>
          <TransferEmail
           senderUsername={data.email.sender.username}
           senderEmail={data.email.sender.email}
           emailCreatedAtDate={new Date(data.email.createdAt).toDateString()}
           emailSubject={data.email.emailSubject}
           selectedContent={data.email.emailContent}
           emailFiles={data.email.files} 
           closeTransferEmail={handleCloseEmailMethod} 
          />
        </div>
      ) : null}
      {emailMethods.isResponeShow ? (
        <div className='bg-main-dark-bg rounded-md p-2 mx-5 mb-4'>
          <ResponeEmail
           senderUsername={data.email.sender.username}
           senderEmail={data.email.sender.email}
           emailCreatedAtDate={new Date(data.email.createdAt).toDateString()}
           selectedContent={data.email.emailContent}
           emailFiles={data.email.files} 
           closeResponeEmail={handleCloseEmailMethod}  
          />
        </div>
      ) : null}
    </>
  )
}

export default Email;