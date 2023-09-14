import React, { useState } from 'react';

import { BiImageAdd, BiVideoPlus } from 'react-icons/bi';
import { MdOutlineAttachFile } from 'react-icons/md';
import { AiOutlineSend } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';

import { useMutation } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import Button from '../button/Button';
import Icon from '../icon/Icon';
import Input from '../input/Input';
import TooltipComponent from '../tooltip-component/TooltipComponent';

import {
  Event,
  InputElement,
  Optional,
  Void
} from '../../types/types';

import { Socket } from 'socket.io-client/build/esm/socket';

import './send-message.css';

type MessageSender = {
  _id: Optional<string>;
  username: Optional<string>;
  userImg: Optional<string>;
}

interface SendMessageProps {
  socket: Socket | null,
  groupID: Optional<string>,
  messageSender: MessageSender,
  clearArrivalMessagae: Void,
}

const SendMessage: React.FC<SendMessageProps> = ({ socket, groupID, messageSender, clearArrivalMessagae }) => {

  const [messageText, setMessageText] = useState(''); 
  const [images, setImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [uploadedMessageAttachments, setUploadedMessageAttachments] = useState<{filename: string, filePath: string, mimeType: string}[]>([]);

  const uploadImageMutation = useMutation(async (imageFormData: FormData) => {
    const res = await axios.post('http://localhost:8800/api/v1/upload/image', imageFormData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      let newUploadedMessageAttachments: {filename: string, filePath: string, mimeType: string}[] = uploadedMessageAttachments;
      newUploadedMessageAttachments.push({filename: data.image.src.split('/').at(-1), filePath: data.image.src, mimeType: data.image.mimeType});

      setUploadedMessageAttachments(newUploadedMessageAttachments);
    }
  });

  const uploadVideoMutation = useMutation(async (videoFormData: FormData) => {
    const res = await axios.post('http://localhost:8800/api/v1/upload/video', videoFormData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      let newUploadedMessageAttachments: {filename: string, filePath: string, mimeType: string}[] = uploadedMessageAttachments;
      newUploadedMessageAttachments.push({filename: data.video.src.split('/').at(-1), filePath: data.video.src, mimeType: data.video.mimeType});

      setUploadedMessageAttachments(newUploadedMessageAttachments);
    }
  });

  const uploadFileMutation = useMutation(async (fileFormData: FormData) => {
    const res = await axios.post('http://localhost:8800/api/v1/upload/file', fileFormData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      let newUploadedMessageAttachments: {filename: string, filePath: string, mimeType: string}[] = uploadedMessageAttachments;
      newUploadedMessageAttachments.push({filename: data.file.filename, filePath: data.file.src, mimeType: `file/${data.file.mimeType}`});

      setUploadedMessageAttachments(newUploadedMessageAttachments);
    }
  });

  const mutation = useMutation(async (formData: { messageContent: string, messageAttachments?: {filename: string, mimeType: string, filePath: string}[] }) => {
    const res = await axios.post(`http://localhost:8800/api/v1/conversation/send-message/${groupID}`, formData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      socket?.emit('sendMessage', {message: data.displayConversation, isFinished: true});
      setMessageText('');
      setUploadedMessageAttachments([]);
      setImages([]);
      setFiles([]);
      setVideos([]);
    }
  });

  function handleChangeMessageText (event: Event<InputElement>): void {
    setMessageText(event.target.value)
  }

  function handleAddImages (event: Event<InputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      const addedImages = Array.from(event.target.files);

      setImages(prevImages => {
        prevImages.push(...addedImages)
        return prevImages.flat()
      });
    }
  }

  function handleDeleteImage (index: number): void {
    if (images) {
      let newImages: File[] = [];

      for (let i = 0; i < images?.length; i++) {
        if (i !== index) {
          newImages.push(images[i]);
        }
      }

      setImages(newImages);
    }
  }

  function handleAddFiles (event: Event<InputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      const addedFiles = Array.from(event.target.files);
      
      setFiles(prevFiles => {
        prevFiles.push(...addedFiles);
        return prevFiles.flat();
      });
    }
  }

  function handleDeleteFile (index: number): void {
    if (files) {
      let newFiles: File[] = [];

      for (let i = 0; i < files?.length; i++) {
        if (i !== index) {
          newFiles.push(files[i]);
        }
      }

      setFiles(newFiles);
    }
  }

  function handleAddVideos (event: Event<InputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      const addedVideos = Array.from(event.target.files);
      
      setVideos(prevFiles => {
        prevFiles.push(...addedVideos)
        return prevFiles.flat();
      });
    }
  }

  function handleDeleteVideo (index: number): void {
    if (files) {
      let newVideos: File[] = [];
      
      for (let i = 0; i < files?.length; i++) {
        if (i !== index) {
          newVideos.push(files[i]);
        }
      }

      setVideos(newVideos);
    }
  }

  function generateTemMessages () {
    return {
      _id: "1",
      groupID,
      messageSender,
      messageContent: messageText,
      messageAttachments: uploadedMessageAttachments,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    }
  } 

  async function handleSendMessage (event: React.FormEvent): Promise<void> {
    event.preventDefault()

    clearArrivalMessagae();

    if (messageText || images || videos || files) {
      const uploadData = new FormData();

      for (const image of images) {
        uploadData.append("image", image, image.name);
        await uploadImageMutation.mutateAsync(uploadData);
        uploadData.delete("image");
      }

      for (const video of videos) {
        uploadData.append("video", video, video.name);
        await uploadVideoMutation.mutateAsync(uploadData);
        uploadData.delete("video");
      }
  
      for (const file of files) {
        uploadData.append("file", file, file.name);
        await uploadFileMutation.mutateAsync(uploadData);
        uploadData.delete("file");
      }

      socket?.emit('sendMessage', {message: generateTemMessages(), isFinished: false});
      mutation.mutate({messageContent: messageText, messageAttachments: uploadedMessageAttachments});
    }
  }

  return (
    <div className='sticky top-full left-0 w-full bg-black px-5 py-3'>
      <form 
       className='flex items-center gap-5 w-full'
       onSubmit={handleSendMessage}
      >
        <div className='w-full'>
          {images && images.length > 0 ? (
            <React.Fragment>
              {images.map((image, index) => (
                <div key={index} className='relative w-full'>
                  <img src={URL.createObjectURL(image)} alt="content-image" className='w-full h-32 my-3 object-contain' />
                  <span className='absolute top-1 right-10 cursor-pointer text-gray-400' onClick={() => handleDeleteImage(index)}>X</span>
                </div>
              ))}
            </React.Fragment>
          ) : null}
          {videos && videos.length > 0 ? (
            <React.Fragment>
              {videos.map((video, index) => (
                <div key={index} className='relative'>
                  <video 
                   src={URL.createObjectURL(video)}
                   loop
                   controls
                   className='my-3' 
                  />
                  <span className='absolute top-1 right-10 cursor-pointer text-gray-400' onClick={() => handleDeleteVideo(index)}>X</span>
                </div>
              ))}
            </React.Fragment>
          ) : null}
          {files && files.length > 0 ? (
            <div className='px-3 py-2 flex flex-row gap-3 overflow-x-auto'>
              {files.map((file, index) => (
                <div key={index} className='flex items-center pr-2 rounded-full bg-blue-500'>
                  <Icon
                  title='Delete'
                  textSize='2xl'
                  iconPosition='left'
                  icon={<TiDelete />}
                  color='white'
                  bgColor='bg-transparent'
                  customFunc={() => handleDeleteFile(index)} 
                  />
                  <a href={URL.createObjectURL(file)} className='text-gray-200'>
                    {file.name}
                  </a>
                </div>
              ))}
            </div>
          ) : null}
          <Input
           id='messageText'
           label={`What's in your mind ${Cookies.get('username')?.split(' ')[0]}...`}
           type='text'
           value={messageText}
           customFunc={handleChangeMessageText}
          />
        </div>
        <div className='flex items-center gap-3'>
          <input 
           type="file"
           accept='image/*'
           className='hidden'
           multiple
           id='addImg'
           name='image'
           onChange={handleAddImages} 
          />
          <TooltipComponent
            message='Add Image'
            direction='top'
          >
            <label 
            htmlFor="addImg"
            className='cursor-pointer'
            >
              <BiImageAdd />
            </label>
          </TooltipComponent>
          <input 
           type="file"
           accept='video/*'
           className='hidden'
           multiple
           id='addVideo'
           name='video'
           onChange={handleAddVideos} 
          />
          <TooltipComponent
            message='Add Video'
            direction='top'
          >
            <label 
            htmlFor="addVideo"
            className='cursor-pointer'
            >
              <BiVideoPlus />
            </label>
          </TooltipComponent>
          <input 
           type="file"
           accept='*'
           className='hidden'
           multiple
           id='addFile'
           name='file'
           onChange={handleAddFiles} 
          />
          <TooltipComponent
            message='Add File'
            direction='top'
          >
            <label 
            htmlFor="addFile"
            className='cursor-pointer'
            >
              <MdOutlineAttachFile />
            </label>
          </TooltipComponent>
        </div>
        <TooltipComponent
         message='Send'
        >
          <Button
           type='submit'
           color='rgb(96 165 250)'
           bgColor='transparent'
           text={<AiOutlineSend />}
           paddingSize='1'
           textSize='2xl'
          />
        </TooltipComponent>
      </form>
    </div>
  )
}

export default SendMessage;