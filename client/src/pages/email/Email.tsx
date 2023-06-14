import React from 'react'

import { Navigate, useParams } from 'react-router-dom';

import {
  EmailNavbar,
  EmailLayout
} from '../../components';

import { getParamsFromURL } from '../../hooks/useParams';

import './email.css';

const Email: React.FC = () => {

  const queryStrings = getParamsFromURL(document.location.href);

  const { emailCategory } = useParams();

  console.log({ queryStrings })

  return (
    <>
      <EmailNavbar
       category={emailCategory} 
      />
      <EmailLayout
       subject='Test'
       sender={{username: 'Jhon_Doe', email: 'jhon@smail.com'}}
       recipients={[{recipientEmail: 'jan@smail.com'}, {recipientEmail: 'jan@smail.com'}, {recipientEmail: 'jan@smail.com'}]}
       content={`
                <div>
                  <h1>it is a test</h1>
                  <img src='https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg' />
                </div>
       `} 
      />
      {emailCategory === 'inbox' ? (
        <div>
          Inbox Email
          <br />
          Email id: {queryStrings?.e_id}
        </div>
      ) :
      emailCategory === 'sent' ? (
        <div>
          Sent Email
          <br />
          Email id: {queryStrings?.e_id}
        </div>
      ) : 
      emailCategory === 'groups' ? (
        <div>
          Group Email
          <br />
          Email id: {queryStrings?.e_id}
          <br />
          Group id: {queryStrings?.g_id}
        </div>
      ) : <Navigate to='/inbox' />}
    </>
  )
}

export default Email;