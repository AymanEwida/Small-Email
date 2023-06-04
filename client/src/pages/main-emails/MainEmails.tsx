import React, { useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import {
  EmailsNavbar,
  EmailComponent
} from '../../components';

import './main-emails.css'

const MainEmails: React.FC = () => {

  const { emailCategory } = useParams();

  const [isChecked, setIsChecked] = useState(false);
  const repeat = (arr: any[], n: number) => Array.from({ length: arr.length * n }, (_, i) => arr[i % arr.length]);
  const [statuses, setStatuses] = useState<boolean[]>(repeat([true], 5));

  function handleChecked (): void {
    setIsChecked(prevIsChecked => !prevIsChecked);
    setStatuses(repeat([!isChecked], 5));
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
      <EmailsNavbar
       isEmailsChecked={isChecked}
       handleEmailsChecked={handleChecked} 
      />
      {emailCategory === 'inbox' ? (
        <div>
          {statuses.map((status, index) => (
            <EmailComponent
             key={index} 
             isEmailChecked={status}
             handleEmailChecked={() => handleStatuses(index)} 
            />
          ))} 
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