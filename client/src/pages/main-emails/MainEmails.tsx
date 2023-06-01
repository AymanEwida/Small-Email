import React from 'react';

import { Navigate, useParams } from 'react-router-dom';

import {
  EmailsNavbar,
  EmailComponent
} from '../../components';

import './main-emails.css'

const MainEmails: React.FC = () => {

  const { emailCategory } = useParams();

  return (
    <>
      <EmailsNavbar />
      {emailCategory === 'inbox' ? (
        <div>
          <EmailComponent /> 
          <EmailComponent />
          <EmailComponent />
          <EmailComponent />
          <EmailComponent />
        </div>
      ) :
      emailCategory === 'sent' ? (
        <div>
          Sent
        </div>
      ) : 
      emailCategory === 'saved-drafts' ? (
        <div>
          SavedDrafts
        </div>
      ) : <Navigate to='/inbox' />}
    </>
  )
}

export default MainEmails;