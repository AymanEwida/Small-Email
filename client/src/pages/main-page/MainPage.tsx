import React, { useContext, useState } from 'react';

import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import {
  MainEmails,
  Groups,
  Workspace
} from '../';

import {
  Navbar,
  Sidebar,
  SendEmail
} from '../../components';

import { NavbarContext } from '../../context/navbar-context/NavbarContext';

import './main-page.css';

const MainPage: React.FC = () => {

  const {
    state
  } = useContext(NavbarContext);

  const [isEmail, setIsEmail] = useState(false);

  function handleIsEmail (): void {
    setIsEmail(prevIsEmail => !prevIsEmail);
  }

  function setIsEmailToFalse (): void {
    setIsEmail(false);
  }

  return (
    <div className={`${state.isMenu ? 'ml-80': 'ml-24'} mr-5 pt-20`}>
      <Navbar />
      <Sidebar 
       isMenuActive={state.isMenu}
       sendEmailFunc={handleIsEmail} 
      />
      <div className='bg-slate-950 height w-full overflow-hidden rounded-lg overflow-y-auto relative'>
        <Routes>
          <Route path='/:emailCategory' index element={<MainEmails />} />
          <Route path='/groups' element={<Groups />} />
          <Route path='/workspace' element={<Workspace />} />
          <Route path='/*' element={'No!!'} />
        </Routes>
        {isEmail ? <SendEmail closeSendEmail={setIsEmailToFalse} /> : null}
      </div>
    </div>
  )
}

export default MainPage;