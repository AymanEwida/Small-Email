import React, { useState } from 'react';

import {
  EmailsNavbar,
  EmailComponent
} from '../../components';

import { arrayRepeat } from '../../functions/arrayRepeat';
import { getParamsFromURL } from '../../hooks/useParams';

import './group-emails.css';

const GroupEmails: React.FC = () => {
  
  const queryStrings = getParamsFromURL(document.location.href);

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
      <EmailsNavbar
       isEmailsChecked={isChecked}
       handleEmailsChecked={handleChecked} 
      />
      <div>
        {statuses.map((status, index) => (
          <EmailComponent
           key={index} 
           isEmailChecked={status}
           handleEmailChecked={() => handleStatuses(index)} 
          />
        ))}
        <span>
          Group id: {queryStrings?.g_id}
        </span>  
      </div>
    </>
  )
}

export default GroupEmails;