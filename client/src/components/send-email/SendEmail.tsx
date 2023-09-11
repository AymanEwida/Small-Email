import React, { useState, useRef, useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import axios, { AxiosError } from 'axios';

import Cookies from 'js-cookie';

import parse from 'html-react-parser';

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
import FoundUsers from '../found-users/FoundUsers';
import LoadingComponent from '../loading-component/LoadingComponent';
import Tefo from '../tefo/Tefo';

import { 
  FormEvent,
  Void,
  Event,
  InputElement,
  User,
  Group,
  Optional,
  Recipient,
  Draft
} from '../../types/types';

import { Buffer } from 'buffer';

import './send-email.css';

interface SendEmailProps {
  selectedDraft ?: Draft,
  closeSendEmail: Void,
}

const SendEmail: React.FC<SendEmailProps> = ({ selectedDraft, closeSendEmail }) => {

  const queryClient = useQueryClient();

  const [emailInputs, setEmailInputs] = useState({
    recipient: '',
    subject: selectedDraft?.draftSubject || ''
  });
  const [recipients, setRecipients] = useState<string[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[] | undefined>(selectedDraft?.to || undefined);
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
  const [imgs, setImgs] = useState<{url: string}[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{filename: string, filePath: string}[]>([]);

  const emailContent = useRef<HTMLDivElement>(null);

  const {isError, error, isLoading, data} = useQuery(['searchForUsersAndGroupsByEmail', emailInputs.recipient], async () => {
    const res = await axios.get(`http://localhost:8800/api/v1/user/search-for-users-and-groups?email=${emailInputs.recipient}`, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data
  }, {
    enabled: emailInputs.recipient.length > 0
  });

  const uploadImageMutation = useMutation(async (imageFormData: FormData) => {
    const res = await axios.post('http://localhost:8800/api/v1/upload/image', imageFormData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      setImgs(prevImgs => (
        [
          ...prevImgs,
          {url: data.image.src}
        ]
      ));
    }
  });

  const uploadFileMutation = useMutation(async (fileFormData: FormData) => {
    const res = await axios.post('http://localhost:8800/api/v1/upload/file', fileFormData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: (data) => {
      let newUploadedFiles: {filename: string, filePath: string}[] = uploadedFiles;
      newUploadedFiles.push({filename: data.file.filename, filePath: data.file.src});

      setUploadedFiles(newUploadedFiles);
      console.log({uploadedFiles});
    }
  });

  const sendEmailMutation = useMutation(async (sendEmailFormData: {to: string[], emailContent: string | undefined, emailSubject: string, imgs: {url: string}[], files: {filename: string, filePath: string}[]}) => {
    const res = await axios.post('http://localhost:8800/api/v1/email/send-email', sendEmailFormData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('sentEmails');
      closeSendEmail();
    }
  });

  const saveDraftMutation = useMutation(async (saveDraftFormData: {to: string[], draftContent: string | undefined, draftSubject: string, draftImgs: Buffer[], draftFiles: {file: Buffer, filename: string}[]}) => {
    const res = await axios.patch('http://localhost:8800/api/v1/user/saved-drafts/add', saveDraftFormData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("savedDrafts");
      closeSendEmail();
    }
  });

  const updateDraftMutation = useMutation(async (updateDraftFormData: {to: Recipient[] | undefined, draftContent: string | undefined, draftSubject: string, draftImgs: Buffer[], draftFiles: {file: Buffer, filename: string}[]}) => {
    const res = await axios.patch(`http://localhost:8800/api/v1/user/saved-drafts/update/${selectedDraft?._id}`, updateDraftFormData, { headers: { Authorization: 'Bearer ' + Cookies.get('token') } });
    return res.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("savedDrafts");
      closeSendEmail();
    }
  });

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

  function getFoundUsersData (data: (User & Group)[]): User[] {
    let newFoundUsers: User[] = []
    
    for (const user of data) {
      if (user.role === 'user') {
        newFoundUsers.push(user)
      } else if (user.role === 'group') {
        newFoundUsers.push({
          _id: user._id,
          role: user.role,
          email: user.groupEmail,
          username: user.groupName,
          userImg: user.groupImg
        });
      }
    }

    return newFoundUsers
  }

  function addRecipient (index: number): void {
    if (selectedRecipients) {
      let newRecipient: any = {
        recipientID : data.usersAndGroups[index]._id,
        role : data.usersAndGroups[index].role
      };

      if (data.usersAndGroups[index].username) {
        newRecipient.username = data.usersAndGroups[index].username;
      } else {
        newRecipient.groupName = data.usersAndGroups[index].groupName;
      }

      setSelectedRecipients(prevSelectedRecipients => (
        prevSelectedRecipients && [...prevSelectedRecipients, newRecipient]
      ));
    } else {
      setRecipients(prevRecipients => (
        [...prevRecipients, data.usersAndGroups[index].email || data.usersAndGroups[index].groupEmail]
      ));
    }
    setEmailInputs(prevEmailInputs => (
      {
        ...prevEmailInputs,
        recipient: '',
      }
    ));
  }

  function deleteRecipient (index: number): void {
    let newRecipients: string[] = [];

    for (let i = 0; i < recipients.length; i++) {
      if (i !== index) {
        newRecipients.push(recipients[i]);
      }
    }

    setRecipients(newRecipients);
  }

  function deleteSelectedRecipient (index: number): void {
    let newSelectedRecipients: string[] = [];

    for (let i = 0; i < recipients.length; i++) {
      if (i !== index) {
        newSelectedRecipients.push(recipients[i]);
      }
    }

    setRecipients(newSelectedRecipients);
  }

  function changeContentString (contentString: Optional<string>, imgsCount: number, isEmailSaved: boolean): Optional<string> {
    const content  = contentString as string;
    const startImgEelment = content?.indexOf('<div class=\"relative\">');
    
    let newContentString = content

    if (startImgEelment != -1) {
      const endImgElement = content?.indexOf('</span>');
      
      newContentString = isEmailSaved ? content?.slice(0, startImgEelment) + `<img src=\"${URL.createObjectURL(images[imgsCount])}\" alt=\"content-image\" class=\"w-3/4 h-fit my-3 object-cover\">` + content?.slice(endImgElement+13) : content?.slice(0, startImgEelment) + `<img src=\"${imgs[imgsCount].url}\" alt=\"content-image\" class=\"w-3/4 h-fit my-3 object-cover\">` + content?.slice(endImgElement+13); 
    } else {
      return newContentString;
    }

    return changeContentString(newContentString, imgsCount+1, isEmailSaved);
  }

  let selectedContent = selectedDraft?.draftContent && parse(selectedDraft.draftContent);

  async function handleSaveDraft (): Promise<void> {
    if (!recipients && !emailInputs.subject && (!emailContent.current?.innerHTML || emailContent.current.innerHTML === '<br>')) {
      closeSendEmail();
    } else if (selectedDraft) {
      let newFiles: {file: Buffer, filename: string}[] = [];
      let newImages: Buffer[] = [];
      
      for (const file of files) {
        newFiles.push({file: Buffer.from(file.name), filename: file.name});
      }
  
      for (const image of images) {
        newImages.push(Buffer.from(image.name));
      }

      updateDraftMutation.mutate({
        to: selectedRecipients,
        draftContent: '<div>' + changeContentString(emailContent.current?.innerHTML, 0, true) + '</div>',
        draftSubject: emailInputs.subject,
        draftFiles: [...selectedDraft.draftFiles, ...newFiles],
        draftImgs: [...selectedDraft.draftImgs, ...newImages] 
      });
    } else {
      let newFiles: {file: Buffer, filename: string}[] = [];
      let newImages: Buffer[] = [];
      
      for (const file of files) {
        newFiles.push({file: Buffer.from(file.name), filename: file.name});
      }
  
      for (const image of images) {
        newImages.push(Buffer.from(image.name));
      }
  
      saveDraftMutation.mutate({
        to: recipients,
        draftContent: '<div>' + changeContentString(emailContent.current?.innerHTML, 0, true) + '</div>',
        draftSubject: emailInputs.subject,
        draftFiles: newFiles,
        draftImgs: newImages
      });
    }
  }

  async function handleSendEmail (event: FormEvent): Promise<void> {
    event.preventDefault();

    const uploadData = new FormData();

    for (const image of images) {
      uploadData.append("image", image, image.name);
      await uploadImageMutation.mutateAsync(uploadData);
      uploadData.delete("image");
    }

    for (const file of files) {
      uploadData.append("file", file, file.name);
      await uploadFileMutation.mutateAsync(uploadData);
      uploadData.delete("file");
    }
    
    sendEmailMutation.mutate({
      to: recipients,
      emailContent: '<div>' + changeContentString(emailContent.current?.innerHTML, 0, false) + '</div>',
      emailSubject: emailInputs.subject,
      files: uploadedFiles,
      imgs
    });
  }

  //console.log({ content: changeContentString(emailContent.current?.innerHTML, 0), isDesignOptionsActive });

  return (
    <div className='flex justify-center items-center'>
      <div className={`absolute ${fullScreen ? 'top-24' : 'bottom-2 right-2'} z-index`}>
        <form
          className={`w-400 ${fullScreen ? 'w-500 lg:w-800' : ''} bg-black rounded-md overflow-hidden`}
          onSubmit={handleSendEmail}
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
            customFunc={handleSaveDraft} 
            />
          </div>
        </div>
        <div className='flex flex-col gap-3 p-3'>
          <div className='relative'>
            <Input
            type='text'
            id='recipients'
            label='Recipients'
            value={emailInputs.recipient}
            name='recipient'
            customFunc={handleEmailInputs} 
            />
            {isLoading ? <div className='mt-2 bg-main-dark-bg text-center rounded-md p-2 absolute w-full z-50 -bottom-12'>
              <LoadingComponent style='text' />
            </div> : null}
            {isError && (error instanceof AxiosError) ? (
              <Tefo isError={true} message={error.response?.data.msg} />
            ) : null}
            {data ? <div className='absolute -bottom-63 z-50'><FoundUsers users={getFoundUsersData(data.usersAndGroups)} addFunc={addRecipient} /></div> : null}
          </div>
          {(selectedRecipients && selectedRecipients.length > 0) ? (
            <div className='flex flex-row items-center gap-3 flex-wrap mt-3'>
              {selectedRecipients.map((recipient, index) => (
                <div key={index} className='py-1 px-3 rounded-full bg-blue-400 flex items-center gap-4'>
                  <TooltipComponent
                  message='Delete'
                  direction='top'
                  >
                    <button 
                    type='button' 
                    className='text-gray-200 cursor-pointer'
                    onClick={() => deleteSelectedRecipient(index)}
                    >
                      X
                    </button>
                  </TooltipComponent>
                  <p className='font-bold text-gray-300'>
                    {recipient.groupName || recipient.username}
                  </p>
                </div>
              ))}
            </div>
          ) : recipients.length > 0 ? <div className='flex flex-row items-center gap-3 flex-wrap mt-3'>
            {recipients.map((recipientsEmail, index) => (
              <div key={index} className='py-1 px-3 rounded-full bg-blue-400 flex items-center gap-4'>
                <TooltipComponent
                 message='Delete'
                 direction='top'
                >
                  <button 
                  type='button' 
                  className='text-gray-200 cursor-pointer'
                  onClick={() => deleteRecipient(index)}
                  >
                    X
                  </button>
                </TooltipComponent>
                <p className='font-bold text-gray-300'>
                  {recipientsEmail}
                </p>
              </div>
            ))}
          </div> : null}
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
            {selectedContent ? parse(selectedContent as string) : null}
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
             name='image'
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
             name="file"
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