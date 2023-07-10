import React, { useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import {
  EmailComponent,
  GroupsNavbar,
  GroupSettings
} from '../../components';

import { arrayRepeat } from '../../functions';
import { getParamsFromURL } from '../../hooks/useParams';

import './group-emails.css';

const GroupEmails: React.FC = () => {
  
  const queryStrings = getParamsFromURL(document.location.href);

  const { groupCategory } = useParams();

  const [category, setCategory] = useState<string | undefined>(groupCategory);
  const [isChecked, setIsChecked] = useState(false);
  const [statuses, setStatuses] = useState(arrayRepeat([false], 5));
  const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);

  function toggleCategory (): void {
    setIsSettingMenuOpen(false);

    if (category === 'emails') {
      setCategory('conversation');
    } else {
      setCategory('emails');
    }
  }

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

  function openSettingsMenu (): void {
    setIsSettingMenuOpen(true);
  }

  function closeSettingsMenu (): void {
    setIsSettingMenuOpen(false);
  }

  return (
    <>      
      <GroupsNavbar
       category={category}
       isEmailsChecked={isChecked}
       handleEmailsChecked={handleChecked} 
       toggleFunc={toggleCategory}
       openSettingsMenuFunc={openSettingsMenu} 
      />
      {groupCategory === 'emails' ? (
        <div>
          {statuses.map((status, index) => (
            <EmailComponent
            key={index} 
            isEmailChecked={status}
            handleEmailChecked={() => handleStatuses(index)} 
            />
          ))}
          {/* <span>
            Group id: {queryStrings?.g_id}
          </span>   */}
        </div>
      ) :
      groupCategory === 'conversation' ? (
        <div>
          Chat
        </div>
      ) : <Navigate to='/groups/emails?g_id=1' />}
      {isSettingMenuOpen ? (
        <GroupSettings
         category={category}
         isCurrentUserAdmin 
         closeFunc={closeSettingsMenu}
         toggleFunc={toggleCategory} 
        /> 
      ) : null}
    </>
  )
}

export default GroupEmails;