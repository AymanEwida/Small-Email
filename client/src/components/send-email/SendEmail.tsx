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

  const [emailInputs, setEmailInputs] = useState({
    recipient: '',
    subject: ''
  });
  const [fullScreen, setFullScreen] = useState(false);
  const [isDesignOptions, setIsDesignOptions] = useState(false);
  const [isDesignOptionsActive, setIsDesignOptionsActive] = useState({
    underLine: false,
    italic: false,
    bold: false
  });
  const [designedText, setDesignedText] = useState('');
  const [designOptions, setDesignOptions] = useState<{underLine: boolean, italic: boolean, bold: boolean, text: string}[]>([]);
  const [isAddLink, setIsAddLinke] = useState(false);
  const [addLinks, setAddLinks] = useState<{url: string, text: string}[]>([]);
  const [linkInputs, setLinkInputs] = useState({
    href: '',
    text: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const emailContent = useRef<HTMLDivElement>(null);

  function handleFullScreen (): void {
    setFullScreen(prevFullScreen => !prevFullScreen);
  }

  function handleEmailInputs (event: Event<InputElement>): void {
    setEmailInputs(prevEmailInputs => (
      {
        ...prevEmailInputs,
        [event.target.name]: event.target.value
      }
    ));
  }

  function toggleDesignOptions (): void {
    setIsDesignOptions(prevIsDesignOptions => !prevIsDesignOptions);
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

      setFiles(prevFiles => {
        prevFiles.push(...addedFiles)
        return prevFiles.flat()
      });
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

  function handleLinkInputs (event: Event<InputElement>): void {
    setLinkInputs(prevLinkInputs => (
      {
        ...prevLinkInputs,
        [event.target.name]: event.target.value
      }
    ))
  }

  console.log({ content: emailContent.current, isDesignOptionsActive });

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
          value={emailInputs.recipient}
          name='recipient'
          customFunc={handleEmailInputs} 
          />
          <Input
          type='text'
          id='subject'
          label='Subject'
          value={emailInputs.subject}
          name='subject'
          customFunc={handleEmailInputs} 
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
           onChange={() => console.log('I am here!')}
          >
            <br />
            {images ? (
              <React.Fragment>
                {images.map((image, index) => (
                  <div key={index} className='relative'>
                    <img src={URL.createObjectURL(image)} alt="content-image" className='w-3/4 h-fit my-3 object-cover' />
                    <span className='absolute top-1 left-1 cursor-pointer text-black' onClick={() => handleDeleteImage(index)}>X</span>
                  </div>
                ))}
              </React.Fragment>
            ) : null}
            {addLinks ? (
              <React.Fragment>
                {addLinks.map((link, index) => (
                  <a key={index} href={link.url} className='text-blue-400 underline cursor-pointer'>{link.text}</a>
                ))}
              </React.Fragment>
            ) : null}
            {designOptions ? (
              <React.Fragment>
                {designOptions.map((text, index) => (
                  <p key={index} className={`${text.underLine ? 'underline' : ''} ${text.italic ? 'italic' : ''} ${text.bold ? 'font-body' : ''}`}>{text.text}</p>
                ))}
              </React.Fragment>
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
                <div className='absolute -top-96 p-4 w-60 rounded-sm drop-shadow-xl -translate-x-1/4 bg-gray-500'>
                  <div className='flex items-center justify-center gap-2'>
                    <span className={isDesignOptionsActive.underLine ? 'bg-gray-400' : ''}>
                      <Icon
                      title='Underline'
                      iconPosition='top'
                      color='white'
                      textSize='md'
                      bgColor='bg-gray-400'
                      icon={<AiOutlineUnderline />}
                      customFunc={() => setIsDesignOptionsActive(previsDesignOptionsActive => (
                        {
                          ...previsDesignOptionsActive,
                          underLine: !previsDesignOptionsActive.underLine
                        }
                      ))}
                      />
                    </span>
                    <span className={isDesignOptionsActive.italic ? 'bg-gray-400' : ''}>
                      <Icon
                      title='Italic'
                      iconPosition='top'
                      color='white'
                      textSize='md'
                      bgColor='bg-gray-400'
                      icon={<AiOutlineItalic />}
                      customFunc={() => setIsDesignOptionsActive(previsDesignOptionsActive => (
                        {
                          ...previsDesignOptionsActive,
                          italic: !previsDesignOptionsActive.italic
                        }
                      ))}
                      />
                    </span>
                    <span className={isDesignOptionsActive.bold ? 'bg-gray-400' : ''}>
                      <Icon
                      title='Bold'
                      iconPosition='top'
                      color='white'
                      textSize='md'
                      bgColor='bg-gray-400'
                      icon={<AiOutlineBold />}
                      customFunc={() => setIsDesignOptionsActive(previsDesignOptionsActive => (
                        {
                          ...previsDesignOptionsActive,
                          bold: !previsDesignOptionsActive.bold
                        }
                      ))}
                      />
                    </span>
                  </div>
                  <Input
                   id='desingedText'
                   type='text'
                   label='Your Text'
                   isRequired
                   value={designedText}
                   customFunc={(event: Event<InputElement>) => {
                    setDesignedText(event.target.value)
                   }} 
                  />
                  <div className='mt-2'>
                    <Button
                     type='button'
                     textSize='md'
                     text='Add Link'
                     borderRadius='10px'
                     bgColor='rgb(96 165 250)'
                     paddingSize='2'
                     color='white'
                     customFunc={() => {
                      if (designedText) {
                        setDesignOptions(prevDesignOptions => (
                          [
                            ...prevDesignOptions,
                            {
                              ...isDesignOptionsActive,
                              text: designedText
                            }
                          ]
                        ))
                      }
                      setIsDesignOptions(false)
                      setIsDesignOptionsActive({
                        underLine: false,
                        italic: false,
                        bold: false
                      })
                      setDesignedText('')
                     }}
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
             customFunc={() => setIsAddLinke(prevIsAddLinke => !prevIsAddLinke)}
            />
            {isAddLink ? (
              <div className='flex flex-col items-start rounded-sm gap-2 -translate-x-1/4 absolute top-1/2 bg-gray-500 p-2'>
                <Input
                 id='href'
                 type='url'
                 label='Destination URL'
                 isRequired
                 name='href'
                 value={linkInputs.href}
                 customFunc={handleLinkInputs}
                />
                <Input
                 id='text'
                 type='text'
                 label='Your Text'
                 isRequired
                 name='text'
                 value={linkInputs.text}
                 customFunc={handleLinkInputs}
                />
                <Button
                 type='button'
                 textSize='md'
                 text='Add Link'
                 borderRadius='10px'
                 bgColor='rgb(96 165 250)'
                 paddingSize='2'
                 color='white'
                 customFunc={() => {
                  setIsAddLinke(false)
                  if (( linkInputs.href.startsWith('http://') || linkInputs.href.startsWith('https://') ) && linkInputs.text.length > 0) {
                    setAddLinks(prevAddLinks => (
                      [
                        ...prevAddLinks,
                        {url: linkInputs.href, text: linkInputs.text}
                      ]
                    ))
                  }
                  setLinkInputs({
                    href: '',
                    text: ''
                  })
                 }}  
                />
              </div>
            ) : null}
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