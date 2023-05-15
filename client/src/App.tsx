import React, { useContext, useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AiOutlineFullscreen, AiFillDelete, AiOutlineFullscreenExit } from 'react-icons/ai';
import { RiDeleteBack2Fill } from 'react-icons/ri';

import {
  Navbar,
  Sidebar,
  EmailsNavbar,
  Input,
  Icon,
  Button
} from './components';

import {
  Home,
  Inbox,
  Sent,
  Groups,
  Workspace,
  ChooseAccount,
  ProfileSettings
} from './pages'

import { NavbarContext } from './context/navbar-context/NavbarContext';

import {
  EventInputElement, 
  FormEvent
} from './types/types';

import './App.css';

const App: React.FC = () => {

  const {
    state
  } = useContext(NavbarContext);

  const [isEmail, setIsEmail] = useState(false);
  const [to, setTo] = useState('');
  const [tos, setTos] = useState('');
  const [fullScreen, setFullScreen] = useState(false);

  function handleIsEmail (): void {
    setIsEmail(prevIsEmail => !prevIsEmail);
  }

  function handleFullScreen (): void {
    setFullScreen(prevFullScreen => !prevFullScreen);
  }

  console.log({tos});

  return (
    <Router>
      <div className={`${state.isMenu ? 'ml-80': 'ml-24'} mr-5`}>
        <Navbar />
        <Sidebar 
         isMenuActive={state.isMenu}
         sendEmailFunc={handleIsEmail} 
        />
        <div className='bg-slate-950 height w-full rounded-lg overflow-y-auto'>
          <EmailsNavbar />
          <div className='p-3'>
            <Routes>
              <Route path='/' index element={<Home />} />
              <Route path='/inbox' element={<Inbox />} />
              <Route path='/sent' element={<Sent />} />
              <Route path='/groups' element={<Groups />} />
              <Route path='/workspace' element={<Workspace />} />
              <Route path='/choose-account' element={<ChooseAccount />} />
              <Route path='/profile-settings' element={<ProfileSettings />} />
            </Routes>
          </div>
          {isEmail ? (
            <div className={fullScreen ? 'grid place-content-center' : 'absolute bottom-2 right-10'}>
              <form
                className={`w-400 ${fullScreen ? 'w-500 lg:w-800' : ''} bg-black rounded-md overflow-hidden`}
                onSubmit={(event: FormEvent) => {
                  event.preventDefault();

                  console.log('I submited wow!');
                }}
              >
                <div className='flex justify-between items-center w-full bg-gray-700 px-6 py-1'>
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
                     title='Delete'
                     iconPosition='bottom'
                     color='white'
                     bgColor='bg-gray-400'
                     icon={<RiDeleteBack2Fill />}
                     customFunc={() => setIsEmail(false)} 
                    />
                  </div>
                </div>
                <div className='p-3'>
                  <Input
                   type='text'
                   id='recipients'
                   label='Recipients'
                   value={to}
                   customFunc={(event: EventInputElement) => setTo(event.target.value)} 
                  />
                  <textarea 
                   cols={30} 
                   rows={10}
                   className='text-white bg-neutral-700 mt-2 w-full outline-none p-2 rounded-md'
                   value={tos}
                   onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setTos(event.target.value)} 
                  />
                </div>
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
                  <Icon
                   title='Delete'
                   iconPosition='top'
                   color='white'
                   bgColor='bg-gray-400'
                   icon={<AiFillDelete />}
                   customFunc={() => setIsEmail(false)}
                  />
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </Router>
  );
}

export default App;