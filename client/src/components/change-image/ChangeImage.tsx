import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useMutation } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import SettingsItemHeader from '../settings-item-header/SettingsItemHeader';
import Button from '../button/Button';
import Input from '../input/Input';
import LoadingComponent from '../loading-component/LoadingComponent';
import Tefo from '../tefo/Tefo';

import {
  Void,
  Event,
  InputElement,
  Optional
} from '../../types/types';

import { AccountsContext } from '../../context/accounts-context/AccountsContext';
import { AccountsTypes } from '../../context/accounts-context/AccountsReducer';

import noAvater from '../../assests/noAvatar.png';

import './change-image.css';

interface ChangeImageProps {
  closeChangeImage: Void
}

const ChangeImage: React.FC<ChangeImageProps> = ({ closeChangeImage }) => {

  const {
    state,
    accountsDispatch
  } = useContext(AccountsContext);

  const [password, setPassword] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSelectedImageError, setIsSelectedImageError] = useState(false);

  const history = useNavigate();

  const mutation = useMutation(async (formData: {password: string, newImg: string}) => {
    const res = await axios.patch('http://localhost:8800/api/v1/user/change/img', formData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      Cookies.set('userImg', data.newImg, { expires: 30 });
      accountsDispatch({ type: AccountsTypes.UpdateAccountCredentials, payload: {username: Cookies.get('username'), newCredential: { credential: "userImg", credentialValue: data.newImg} } });
      history('/profile-settings');
    }
  });

  const uploadImageMutation = useMutation(async (imageFormData: FormData) => {
    const res = await axios.post('http://localhost:8800/api/v1/upload/image', imageFormData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      mutation.mutate({password, newImg: data.image.src});
    }
  });

  function handlePassword (event: Event<InputElement>): void {
    setPassword(event.target.value);
  }

  function handleAddImage (event: Event<InputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      const addedImage = event.target.files[0];
      setImage(addedImage);
    }
  }

  function getImageSrc (): Optional<string> {
    if (image) {
      return URL.createObjectURL(image);
    } else if (Cookies.get('userImg')) {
      return Cookies.get('userImg');
    }

    return noAvater;
  }

  function handleSubmit (event: React.FormEvent): void {
    event.preventDefault();

    setIsSelectedImageError(false);

    if (image) {
      const uploadData = new FormData();

      uploadData.append("image", image, image.name);
      uploadImageMutation.mutate(uploadData);

      // if (uploadImageMutation.isSuccess && uploadImageMutation.data) {
      //    mutation.mutate({password, newImg: uploadImageMutation.data.image.src});

      //   if (mutation.isSuccess && mutation.data) {
      //     accountsDispatch({ type: AccountsTypes.UpdateAccountCredentials, payload: {username: Cookies.get('username'), newCredential: { credential: "email", credentialValue: uploadImageMutation.data.image.src} } });
      //     history('/profile-settings');
      //   }
      // }
    } else {
      setIsSelectedImageError(true);
    }
  }

  return (
    <SettingsItemHeader
     title='Change Image'
     closeFunc={closeChangeImage}
    >
      <form 
       className='mt-5 flex flex-col gap-4 items-start w-full'
       onSubmit={handleSubmit}
      >
        <img
         className='rounded-full object-cover h-20 w-20 m-auto' 
         src={getImageSrc()} 
         alt="profile image" 
        />
        <input
         className='cursor-pointer text-blue-400 underline mt-4'
         type="file"
         onChange={handleAddImage}
         multiple={false}
         accept='.png, .jpeg, .jpg'  
        />
        <Input
         id='password'
         label='Password'
         type='password'
         value={password}
         isRequired
         customFunc={handlePassword}
        />
        <span className='mt-4'>
          <Button
           type='submit'
           paddingSize='2'
           text={mutation.isLoading ? <LoadingComponent style='circle' /> : 'Change Image'}
           bgColor='rgb(74 222 128)'
           color='white'
           borderRadius='10px'
           textSize='md'
           width='fit' 
          />
        </span>
        {isSelectedImageError ? (
          <Tefo isError message='No image selected.' />
        ) : null}
        {(mutation.isError && mutation.error instanceof AxiosError) ? (
          <Tefo isError message={mutation.error.response?.data.msg} />
        ) : null}
         {(mutation.isSuccess && mutation.data) ? (
          <Tefo isError={false} message={mutation.data.msg} />
        ) : null}
      </form>
    </SettingsItemHeader>
  )
}

export default ChangeImage;