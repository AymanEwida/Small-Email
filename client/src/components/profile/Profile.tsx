import React, { useState, useEffect, useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { AiOutlineUserAdd, AiFillDelete } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';

import noAvater from '../../assests/noAvatar.png';

import { AccountsContext } from '../../context/accounts-context/AccountsContext';
import { AccountsTypes } from '../../context/accounts-context/AccountsReducer';

import { arrayRepeat } from '../../functions';

import './profile.css';

const Profile: React.FC = () => {

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
  
  function handleLogot (): void {
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('email');
    Cookies.remove('userImg');
    window.location.reload();
  }

  function checkAccounts (): void {
    for (let i = 0; i < state.length; i++) {
      const account = state[i];

      if (new Date(account.expired).getTime() <= new Date().getTime()) {
        accountsDispatch({ type: AccountsTypes.DisconnectAccount, payload: { index: i } });
        if (account.username === Cookies.get('username')) {
          Cookies.remove('token');
          Cookies.remove('username');
          Cookies.remove('email');
          Cookies.remove('userImg');
        }
      }
    }
  }

  function handleLogin (token: string, username: string, email: string, userImg: string, isConnected: boolean): void {
    if (token.length > 0 && isConnected) {
      Cookies.set('token', token, { expires: 30 });
      Cookies.set('username', username, { expires: 30 });
      Cookies.set('email', email, { expires: 30 });
      Cookies.set('userImg', username, { expires: 30 });
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
    <div className='absolute top-[70px] right-3 bg-secondary-dark-bg p-5 w-96 rounded-lg z-index'>
      <div className='flex gap-5 items-center border-color border-b-1 pb-4 w-full'>
        <img
         className='rounded-full object-cover h-20 w-20' 
         src={Cookies.get('userImg') ? Cookies.get('userImg') : noAvater}
         alt="profile" 
        />
        <div className='h-20'>
          <h2 className='text-xl font-bold text-green-400'>
            {Cookies.get('username')}
          </h2>
          <p className='text-sm text-gray-400 mb-2'>
            {Cookies.get('email')}
          </p>
          <Link to='/profile-settings'>
            <span className='bg-blue-500 text-sm rounded-md p-1 hover:drop-shadow-md'>
              Manage your account
            </span>
          </Link>
        </div>
      </div>
      <div className='overflow-y-auto h-[220px]'>
        {state.map((account, index) => {
          if (account.username !== Cookies.get('username')) {
            return (
            <div 
             key={index} 
             className='flex gap-1 cursor-pointer hover:bg-hover-bg p-4 border-inherit border-b-1 w-full px-3'  
             onMouseEnter={() => handleShow(index)}
             onMouseLeave={() => handleDisShow(index)}
            >
              <img
              className='rounded-full object-cover h-8 w-8' 
              src={account.userImg ? account.userImg : noAvater} 
              alt="account" 
              />
              <div 
               className='text-sm ml-5'
               onClick={() => handleLogin(account.token, account.username, account.email, account.userImg, account.isUserConnected)}
              >
                <h3 className='text-[16px] font-medium text-blue-500'>
                  {account.username}
                </h3>
                <p className='text-gray-400'>
                  {account.email}
                </p>
              </div>
              {!statuses[index] ? <span className={`text-sm ${account.isUserConnected ? 'text-gray-300' : 'text-red-300'}`}>
                {account.isUserConnected ? 'connected' : 'disconnected'}
              </span> : null}
              {statuses[index] ? (
                <button
                type='button'
                className='show-animation hover:bg-gray-700 p-2 text-white text-md rounded-full'
                onClick={() => handleDeleteAccount(index)}
                >
                  <AiFillDelete />
                </button>
              ) : null}
            </div>);
          } else {
            return null
          }
        })}
      </div>
      <div className='border-color border-b-1 w-full py-3'>
        <Link to='/choose-account'>
          <div className='flex gap-3 items-center m-auto bg-black w-fit p-1 px-2 rounded-md hover:drop-shadow-md'>
            <span className='text-2xl text-green-500'>
              <AiOutlineUserAdd />
            </span>
            <p className='font-light text-gray-300'>
              Add new account
            </p>
          </div>
        </Link>
      </div>
      <button
       type='button' 
       className='mt-2 flex gap-4 items-center w-full justify-center bg-red-500 rounded-full p-2 hover:drop-shadow-md'
       onClick={handleLogot}
      >
        <span className='text-2xl text-color'>
          <IoLogOutOutline />
        </span>
        Log Out
      </button>
    </div>
  )
}

export default Profile;