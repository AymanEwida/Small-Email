import React, { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { FiPlus } from 'react-icons/fi';

import {
  CenterComponent,
  SubTitleHeader
} from '../../components';

import noAvater from '../../assests/noAvatar.png';

import { AccountsContext } from '../../context/accounts-context/AccountsContext';
import { AccountsTypes } from '../../context/accounts-context/AccountsReducer';

import './choose-account.css';

const ChooseAccount: React.FC = () => {

  const {
    state,
    accountsDispatch
  } = useContext(AccountsContext);

  const history = useNavigate();

  function handleLogin (token: string, username: string): void {
    Cookies.set('token', token, { expires: 30 });
    Cookies.set('username', username, { expires: 30 });
    history('/');
    window.location.reload();
  }

  return (
    <div className='h-screen'>
      <CenterComponent addTextCenter>
        <SubTitleHeader
         subTitle='Choose an account' 
        />
        <div className={`mt-4 w-full overflow-y-auto ${state.length > 0 ? "h-72" : "h-fit"} snap-mandatory snap-y`}>
          {state.map((account) => (
            <div onClick={() => handleLogin(account.token, account.username)} className='flex items-center gap-24 w-full p-4 border-inherit border-b-1 cursor-pointer hover:bg-hover-bg snap-center'> 
              <div className='flex gap-4'>
                <img
                 className='h-8 w-8 object-cover rounded-full' 
                 src={noAvater} 
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
              {!account.isUserConnected ? <p className='text-red-700'>
                disconnect
              </p> : null}
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