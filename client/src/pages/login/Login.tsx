import React, { useState, useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import { useQuery } from 'react-query';

import Cookies from 'js-cookie';

import axios, { AxiosError } from 'axios';

import {
  CenterComponent,
  SubTitleHeader,
  Input,
  Button,
  LoadingComponent,
  Tefo
} from '../../components';

import { AccountsContext } from '../../context/accounts-context/AccountsContext';
import { AccountsTypes } from '../../context/accounts-context/AccountsReducer';

import { getParamsFromURL } from '../../hooks/useParams';

import {
  FormEvent,
  Event,
  InputElement
} from '../../types/types';

import './login.css';

type Input = {
  id : string;
  lable : string;
  type : string;
  value : string;
  name : string;
}

const Login: React.FC = () => {

  const {
    accountsDispatch,
  } = useContext(AccountsContext);

  const queryStrings = getParamsFromURL(document.location.href);

  const [inputValues, setInputValues] = useState({
    email: queryStrings?.email || '',
    password: ''
  });

  const inputs: Input[] = [
    {
      id: 'email',
      lable: 'Email',
      type: 'email',
      value: inputValues.email,
      name: 'email'
    },
    {
      id: 'password',
      lable: 'Password',
      type: 'password',
      value: inputValues.password,
      name: 'password'
    }
  ]

  const history = useNavigate();

  function handleInputValues (event: Event<InputElement>): void {
    setInputValues(prevInputValues => (
      {
        ...prevInputValues,
        [event.target.name]: event.target.value,
      }
    ));
  }

  const {isError, error, isLoading, refetch} = useQuery('login', async () => {
    const res = await axios.post('http://localhost:8800/api/v1/auth/login', {email: inputValues.email, password: inputValues.password});
    return res.data;
  }, {
    enabled: false
  });

  async function handleSubmit (event: FormEvent) {
    event.preventDefault();

    const { isSuccess, data } = await refetch();

    if (isSuccess && data) {
      if (queryStrings?.email && queryStrings?.email?.length > 0) {
        accountsDispatch({ type: AccountsTypes.ReconnectAccount, payload: { email: queryStrings?.email, token: data.token, expired: new Date(new Date().getTime() + 30*24*60*60*1000) } })
      } else {
        accountsDispatch({ type: AccountsTypes.AddAccount, payload: {username: data.user.username, email: inputValues.email, userImg: data.user.userImg, token: data.token, isUserConnected: true, expired: new Date(new Date().getTime() + 30*24*60*60*1000)} });
      }
      Cookies.set('token', data.token, { expires: 30 });
      Cookies.set('username', data.user.username, { expires: 30 });
      Cookies.set('email', inputValues.email, { expires: 30 });
      Cookies.set('userImg', data.user.userImg, { expires: 30 });
      history('/');
      window.location.reload();
    }
  }

  return (
    <div className='h-screen'>
      <CenterComponent addTextCenter>
        <SubTitleHeader
         subTitle='Sing in' 
        />
        <form
         className='mt-5 flex flex-col gap-4'
         onSubmit={handleSubmit}
        >
          {inputs.map((input, index) => (
            <Input
             key={index}
             id={input.id}
             label={input.lable}
             type={input.type}
             name={input.name}
             isRequired
             value={input.value}
             customFunc={handleInputValues} 
            />
          ))}
          <span className='text-left'>
            <Button
             type='submit'
             bgColor='rgb(34 197 94)'
             color='white'
             paddingSize='2'
             text={isLoading ? <LoadingComponent style='circle' /> : 'Sing in'}
             textSize='md'
             borderRadius='10px'
             isDisabled={isLoading}
            />
          </span>
        </form>
        <p className='text-gray-400 text-md mt-5'>
          don't have an account? <Link to='/register'><span className='text-blue-400 hover:underline'>Create one</span></Link>
        </p>
      </CenterComponent>
      {isError && (error instanceof AxiosError) ? (
        <Tefo 
         isError
         message={error.response?.data.msg} 
        />
      ) : null}
    </div>
  )
}

export default Login;