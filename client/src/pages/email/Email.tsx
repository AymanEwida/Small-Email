import React from 'react'

import { Navigate, useParams } from 'react-router-dom';

import { getParamsFromURL } from '../../hooks/useParams';

import './email.css';

const Email: React.FC = () => {

  const queryStrings = getParamsFromURL(document.location.href);

  const { emailCategory } = useParams();

  console.log({ queryStrings })

  return (
    <>
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