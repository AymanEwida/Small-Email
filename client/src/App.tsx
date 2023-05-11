import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import {
  Navbar,
  Sidebar,
  EmailsNavbar
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

import './App.css';

const App: React.FC = () => {

  const [isMeunActive, setIsMeunActive] = useState(true);

  return (
    <Router>
      <div className={`${isMeunActive ? 'ml-80': 'ml-24'} mr-5`}>
        <Navbar />
        <Sidebar />
        <div className='bg-slate-950 h-full rounded-lg overflow-y-auto'>
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
        </div>
      </div>
    </Router>
  );
}

export default App;