import React from 'react';

import { Navigate, useParams } from 'react-router-dom';

import {
  EmailsNavbar
} from '../../components';

import './main-emails.css'

const MainEmails: React.FC = () => {

  const { emailCategory } = useParams();

  return (
    <>
      <EmailsNavbar />
      <div className='p-3'>
        {emailCategory === 'inbox' ? (
          <div>
            Inbox
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
      </div>
    </>
  )
}

export default MainEmails;