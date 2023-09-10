import React, { useState, useContext, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { FiPlus } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';

import {
  CenterComponent,
  SubTitleHeader,
  Button
} from '../../components';

import noAvater from '../../assests/noAvatar.png';

import { AccountsContext } from '../../context/accounts-context/AccountsContext';
import { AccountsTypes } from '../../context/accounts-context/AccountsReducer';

import { arrayRepeat } from '../../functions';

import './choose-account.css';

const ChooseAccount: React.FC = () => {

  const {
    state,
    accountsDispatch
  } = useContext(AccountsContext);

  let timeout: NodeJS.Timeout;
  let interval: NodeJS.Timer;

  const [statuses, setStatuses] = useState(arrayRepeat([false], state.length));

  function handleShow (index: number): void {
    timeout = setTimeout(() => {
      let newStatuses: boolean[] = [];

      for (let i = 0; i < statuses.length; i++) {
        if (i !== index) {
          newStatuses.push(statuses[i]);
        } else {
          newStatuses.push(true);
        }
      }

      setStatuses(newStatuses);
    }, 700);
  }

  function handleDisShow (index: number): void {
    clearInterval(timeout);
    let newStatuses: boolean[] = [];

    for (let i = 0; i < statuses.length; i++) {
      if (i !== index) {
        newStatuses.push(statuses[i]);
      } else {
        newStatuses.push(false);
      }
    }

    setStatuses(newStatuses);
  }

  const history = useNavigate();

  function checkAccounts (): void {
    for (let i = 0; i < state.length; i++) {
      const account = state[i];

      if (new Date(account.expired).getTime() <= new Date().getTime()) {
        accountsDispatch({ type: AccountsTypes.DisconnectAccount, payload: { index: i } });
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('email');
        Cookies.remove('userImg');
      }
    }
  }

  function handleLogin (token: string, username: string, email: string, userImg: string, isConnected: boolean): void {
    if (token.length > 0 && isConnected) {
      Cookies.set('token', token, { expires: 30 });
      Cookies.set('username', username, { expires: 30 });
      Cookies.set('email', email, { expires: 30 });
      Cookies.set('userImg', userImg, { expires: 30 });
      history('/');
      window.location.reload();
    } else {
      history(`/login?email=${email}`);
    }
  }

  function handleDeleteAccount (index: number): void {
    accountsDispatch({ type: AccountsTypes.RemoveAccount, payload: { index } });
  }

  function getInterval (): ReturnType<typeof setInterval> {
    return setInterval(() => {
      checkAccounts();
    }, 1000);
  }

  useEffect(() => {
    interval = getInterval();

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className='h-screen'>
      <CenterComponent addTextCenter>
        <SubTitleHeader
         subTitle='Choose an account' 
        />
        <div className={`mt-4 w-full overflow-y-auto ${state.length > 0 ? "h-72" : "h-fit"} snap-mandatory snap-y`}>
          {state.map((account, index) => (
            <div
            key={index} 
             className='p-4 border-inherit border-b-1 cursor-pointer hover:bg-hover-bg snap-center'
             onMouseEnter={() => handleShow(index)}
             onMouseLeave={() => handleDisShow(index)}
            >
              <div className='flex items-center gap-24 w-full'> 
                <div className='flex gap-4'>
                  <img
                  className='h-8 w-8 object-cover rounded-full' 
                  src={account.userImg ? account.userImg : noAvater} 
                  alt="profile img" 
                  />
                  <div className='text-sm text-left'>
                    <h3 className='font-medium text-[16px]'>
                      {account.username}
                    </h3>
                    <p className='text-gray-400'>
                      {account.email}
                    </p>
                  </div>
                </div>
                {!account.isUserConnected && !statuses[index] ? <p className='text-red-700'>
                  disconnect
                </p> : null}
                {statuses[index] ? (
                  <button
                  type='button'
                  className='show-animation hover:bg-gray-700 p-2 text-white text-md rounded-full'
                  onClick={() => handleDeleteAccount(index)}
                  >
                    <AiFillDelete />
                  </button>
                ) : null}
              </div>
              <div className='mt-2'>
                <Button
                 type='button'
                 bgColor={account.isUserConnected ? 'rgb(74 222 128)' : 'rgb(248 113 113)'}
                 textSize='md'
                 color='white'
                 text={account.isUserConnected ? "Connect" : "Reconnect"}
                 paddingSize='1'
                 borderRadius='10px'
                 width='100%'
                 customFunc={() => handleLogin(account.token, account.username, account.email, account.userImg, account.isUserConnected)} 
                />
              </div>
            </div>
          ))}
        </div>
        <Link to='/login'>
          <div className='mt-4 flex items-center gap-4 cursor-pointer mx-4 hover:bg-hover-bg w-fit p-2 rounded-md'>
            <span className='text-xl'>
              <FiPlus />
            </span>
            <p>
              use anthor account
            </p>
          </div> 
        </Link> 
      </CenterComponent>
    </div>
  )
}

export default ChooseAccount;