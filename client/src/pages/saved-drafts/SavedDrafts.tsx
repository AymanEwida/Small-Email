import React, { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import {
  EmailsNavbar,
  SavedDraftComponent,
  LoadingComponent,
  Tefo,
  SendEmail
} from '../../components';

import {
  range,
  arrayRepeat
} from '../../functions';

import './saved-drafts.css';

const SavedDrafts: React.FC = () => {

  const queryClient = useQueryClient();

  const [isChecked, setIsChecked] = useState(false);
  const [statuses, setStatuses] = useState<boolean[]>([]);
  const [savedDraftsIDs, setSavedDraftsIDs] = useState<string[]>([]);
  const [isDraftShow, setIsDraftShow] = useState(false);

  const {isError, error, isLoading, data, refetch} = useQuery("savedDrafts", async () => {
    const res = await axios.get('http://localhost:8800/api/v1/user/saved-drafts', { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    setStatuses(arrayRepeat([false], res.data.savedDrafts.length));
    return res.data;
  });

  const mutation = useMutation(async (savedDraftID: string) => {
    const res = await axios.patch(`http://localhost:8800/api/v1/user/saved-drafts/remove/${savedDraftID}`, {},  { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data; 
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('savedDrafts');
    }
  });

  function handleChecked (): void {
    if (isChecked) {
      setSavedDraftsIDs([]);
    } else {
      let newEmailsIDs: string[] = [];
      data.savedDrafts.forEach((email: any) => {
        newEmailsIDs.push(email._id);
      });
      setSavedDraftsIDs(newEmailsIDs);
    }

    setIsChecked(prevIsChecked => !prevIsChecked);
    setStatuses(arrayRepeat([!isChecked], data.savedDrafts.length));
  }

  function handleEmailsChecked (index: number): void {
    let isChecked = false;
    let newStatuses: boolean[] = [];
    let newSavedDraftsIDs: string[] = savedDraftsIDs;

    for (let i = 0; i < statuses.length; i++) {
      if (i !== index) {
        newStatuses.push(statuses[i]);
      } else {
        if (statuses[i] === true) {
          newStatuses.push(false);
          newSavedDraftsIDs = newSavedDraftsIDs.filter(emailID => emailID !== data.savedDrafts[index]._id);
        } else {
          newStatuses.push(true);
          newSavedDraftsIDs.push(data.savedDrafts[index]._id);
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
    setSavedDraftsIDs(newSavedDraftsIDs);
  }

  async function handleDeleteSavedDrafts () {
    let arrOfPromises = [];

    for (const savedDraftID of savedDraftsIDs) {
      arrOfPromises.push(mutation.mutateAsync(savedDraftID));
    }

    await Promise.all(arrOfPromises);

    setIsChecked(false);
    setSavedDraftsIDs([]);
    setStatuses(arrayRepeat([false], data.savedDrafts.length));
  }

  function handleShowDraft (): void {
    setIsDraftShow(prevIsShowDraft => !prevIsShowDraft);
  }

  function handleCloseDraft (): void {
    setIsDraftShow(false);
  }

  if(isLoading) {
    return (
      <>
      <EmailsNavbar /> 
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
       isEmailsChecked={isChecked}
       handleEmailsChecked={handleChecked}
       handleDeleteEmails={handleDeleteSavedDrafts} 
      />
      {data.savedDrafts.map((savedDraft: any, index: number) => (
        <SavedDraftComponent
         key={savedDraft._id}
         sendTo={savedDraft.to}
         subject={savedDraft.draftSubject}
         updatedAt={new Date(savedDraft.updatedAt).toDateString()}
         content={savedDraft.draftContent}
         isEmailChecked={statuses[index]}
         handleEmailChecked={() => handleEmailsChecked(index)}
         handleDeleteEmail={() => mutation.mutate(savedDraft._id)}
         onClick={handleShowDraft}
         />
      ))}
      {isDraftShow ? (
        <SendEmail closeSendEmail={handleCloseDraft} />
      ) : null}
    </div>
  )
}

export default SavedDrafts;