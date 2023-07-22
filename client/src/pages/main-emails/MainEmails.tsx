import React, { useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import {
  EmailsNavbar,
  EmailComponent
} from '../../components';

import {
  Inbox
} from '../../pages';

import { arrayRepeat } from '../../functions';

import './main-emails.css'

const MainEmails: React.FC = () => {

  const { emailCategory } = useParams();

  const [isChecked, setIsChecked] = useState(false);
  const [statuses, setStatuses] = useState(arrayRepeat([false], 5));

  function handleChecked (): void {
    setIsChecked(prevIsChecked => !prevIsChecked);
    setStatuses(arrayRepeat([!isChecked], 5));
  }

  function handleStatuses (index: number): void {
    let isChecked = false;
    let newStatuses: boolean[] = [];

    for (let i = 0; i < statuses.length; i++) {
      if (i !== index) {
        newStatuses.push(statuses[i]);
      } else {
        if (statuses[i] === true) {
          newStatuses.push(false);
        } else {
          newStatuses.push(true);
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
  }

  return (
    <>
      {/* <EmailsNavbar
       isEmailsChecked={isChecked}
       handleEmailsChecked={handleChecked} 
      /> */}
      {emailCategory === 'inbox' ? (
        <div className=''>
          {/* {statuses.map((status, index) => (
            <EmailComponent
             key={index} 
             isEmailChecked={status}
             handleEmailChecked={() => handleStatuses(index)} 
            />
          ))}  */}
          <Inbox />
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