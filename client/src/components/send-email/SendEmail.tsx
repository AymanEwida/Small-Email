import React, { useState, useRef } from 'react';

import { AiOutlineFullscreen, AiFillDelete, AiOutlineFullscreenExit, AiOutlineDeliveredProcedure, AiOutlineUnderline, AiOutlineItalic, AiOutlineBold } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { BiImageAdd } from 'react-icons/bi';
import { FiLink2 } from 'react-icons/fi';
import { MdOutlineAttachFile } from 'react-icons/md';
import { ImTextColor } from 'react-icons/im';

import Icon from '../icon/Icon';
import Button from '../button/Button';
import Input from '../input/Input';
import TooltipComponent from '../tooltip-component/TooltipComponent';

import { 
  FormEvent,
  Void,
  Event,
  InputElement,
  TextAreaElement
} from '../../types/types';

import './send-email.css';

interface SendEmailProps {
  closeSendEmail: Void
}

const SendEmail: React.FC<SendEmailProps> = ({ closeSendEmail }) => {

  const [to, setTo] = useState('');
  const [tos, setTos] = useState('');
  const [toss, setToss] = useState('');
  const [fullScreen, setFullScreen] = useState(false);
  const [isDesignOptions, setIsDesignOptions] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const emailContent = useRef<HTMLDivElement>(null);

  function handleFullScreen (): void {
    setFullScreen(prevFullScreen => !prevFullScreen);
  }

  function toggleDesignOptions (): void {
    setIsDesignOptions(prevIsDesignOptions => !prevIsDesignOptions);
  }

  function handleAddImages (event: Event<InputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      const addedImages = Array.from(event.target.files);

      setImages(prevImages => (
        [
          ...prevImages,
          addedImages
        ].flat()
      ));
    }
  }

  function handleDeleteImage (index: number): void {
    let newImages: File[] = [];

    if (images) {
      for (let i = 0; i < images?.length; i++) {
        if (i !== index) {
          newImages.push(images[i]);
        }
      }
    }

    setImages(newImages);
  }

  function handleAddFiles (event: Event<InputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      const addedFiles = Array.from(event.target.files);

      setFiles(prevFiles => (
        [
          ...prevFiles,
          addedFiles
        ].flat()
      ));
    }
  }

  function handleDeleteFile (index: number): void {
    let newFiles: File[] = [];

    if (files) {
      for (let i = 0; i < files?.length; i++) {
        if (i !== index) {
          newFiles.push(files[i]);
        }
      }
    }

    setFiles(newFiles);
  }

  return (
    <div className='flex justify-center items-center'>
      <div className={`absolute ${fullScreen ? 'top-24' : 'bottom-2 right-2'} z-index`}>
        <form
          className={`w-400 ${fullScreen ? 'w-500 lg:w-800' : ''} bg-black rounded-md overflow-hidden`}
          onSubmit={(event: FormEvent) => {
            event.preventDefault();

            console.log('I submited wow!');
          }}
        >
        <div className='flex justify-between items-center w-full bg-gray-700 px-10 py-1'>
          <p className='font-semibold'>
            New Email
          </p>
          <div>
            <Icon
            title={`${fullScreen ? 'Exit' : 'Enter'} Full Screen`}
            iconPosition='bottom'
            color='white'
            bgColor='bg-gray-400'
            icon={fullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
            customFunc={handleFullScreen} 
            />
            <Icon
            title='Delete & Save'
            iconPosition='bottom'
            color='white'
            bgColor='bg-gray-400'
            icon={<AiOutlineDeliveredProcedure />}
            customFunc={closeSendEmail} 
            />
          </div>
        </div>
        <div className='flex flex-col gap-3 p-3'>
          <Input
          type='text'
          id='recipients'
          label='Recipients'
          value={to}
          customFunc={(event: Event<InputElement>) => setTo(event.target.value)} 
          />
          <Input
          type='text'
          id='subject'
          label='Subject'
          value={toss}
          customFunc={(event: Event<InputElement>) => setToss(event.target.value)} 
          />
          <div 
           style={{ minHeight: '196px', maxHeight: '288px', resize: 'none' }} 
           className='h-72 outline-none focus:border-none px-1 overflow-y-auto w-full' 
           role='textbox' 
           aria-multiline="true" 
           tabIndex={1} 
           aria-label='body-content'
           contentEditable="true" 
           aria-controls=':tp' 
           aria-owns=':tp' 
           spellCheck='false'
           ref={emailContent}
          >
            <br />
            {images ? (
              <>
                {images.map((image, index) => (
                  <img
                   src={URL.createObjectURL(image)} 
                   alt="content-image"
                   className='w-full h-fit my-3 object-cover mx-4' 
                  />
                ))}
              </>
            ) : null}
          </div>
        </div>
        {files.length > 0 ? (
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
        <div className='flex justify-between items-center px-4 py-2'>
          <Button
          type='submit'
          textSize='md'
          text='Send Email'
          borderRadius='10px'
          bgColor='rgb(96 165 250)'
          paddingSize='2'
          color='white' 
          />
          <div className='flex items-center gap-2'>
            <div className='relative'>
              <Icon
               title='Design Options'
               iconPosition='top'
               color='white'
               textSize='md'
               bgColor='bg-gray-400'
               icon={<ImTextColor />}
               customFunc={toggleDesignOptions}
              />
              {isDesignOptions ? (
                <div className='absolute -top-12 rounded-sm drop-shadow-xl -translate-x-1/4 bg-gray-500'>
                  <div className='flex items-center gap-2'>
                    <Icon
                    title='Uunderline'
                    iconPosition='top'
                    color='white'
                    textSize='md'
                    bgColor='bg-gray-400'
                    icon={<AiOutlineUnderline />}
                    />
                    <Icon
                    title='Italic'
                    iconPosition='top'
                    color='white'
                    textSize='md'
                    bgColor='bg-gray-400'
                    icon={<AiOutlineItalic />}
                    />
                    <Icon
                    title='Bold'
                    iconPosition='top'
                    color='white'
                    textSize='md'
                    bgColor='bg-gray-400'
                    icon={<AiOutlineBold />}
                    />
                  </div>
                </div>
              ) : null}
            </div>
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
             accept='image/*'
             className='hidden'
             multiple
             id='addImg'
             name='images'
             onChange={handleAddImages} 
            />
            <Icon
             title='Add Link'
             iconPosition='top'
             color='white'
             textSize='md'
             bgColor='bg-gray-400'
             icon={<FiLink2 />}
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
            <input 
             type="file"
             accept='*'
             className='hidden'
             multiple
             name="files"
             id='addFile'
             onChange={handleAddFiles} 
            />
          </div>
          <Icon
           title='Remove'
           iconPosition='top'
           color='white'
           textSize='md'
           bgColor='bg-gray-400'
           icon={<AiFillDelete />}
           customFunc={closeSendEmail}
          />
        </div>
      </form>
    </div>
  </div>
  )
}

export default SendEmail;