import React, { useState } from 'react';

import { useMutation } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import SettingsItemHeader from '../settings-item-header/SettingsItemHeader';
import Button from '../button/Button';
import Input from '../input/Input';

import {
  Void,
  Event,
  InputElement,
  Optional
} from '../../types/types';

import noAvater from '../../assests/noAvatar.png';

import './change-image.css';

interface ChangeImageProps {
  closeChangeImage: Void
}

const ChangeImage: React.FC<ChangeImageProps> = ({ closeChangeImage }) => {

  const [password, setPassword] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const uploadImageMutation = useMutation(async (imageFormData: FormData) => {
    const res = await axios.post('http://localhost:8800/api/v1/upload/image', imageFormData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  });

  function handlePassword (event: Event<InputElement>): void {
    setPassword(event.target.value)
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

    console.log('I submitted wow!');
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
           text='Change Img'
           bgColor='rgb(74 222 128)'
           color='white'
           borderRadius='10px'
           textSize='md'
           width='fit' 
          />
        </span>
      </form>
    </SettingsItemHeader>
  )
}

export default ChangeImage;