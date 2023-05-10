import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import {
  Navbar,
  Sidebar
} from './components';

import './App.css';

const App: React.FC = () => {

  const [isMeunActive, setIsMeunActive] = useState(true);

  return (
    <Router>
      <div className=''>
        <Navbar />
        <Sidebar />
        <div className={`${isMeunActive ? 'ml-80': 'ml-24'} bg-slate-950 h-full rounded-lg p-5`}>
          <Routes>
            <Route path='/' index element={'Inbox'} />
            <Route path='/inbox' element={'Inbox'} />
            <Route path='/sent' element={'Sent'} />
            <Route path='/groups' element={'Groups'} />
            <Route path='/workspace' element={'Workspace'} />
            <Route path='/choose-account' element={'Choose Account'} />
            <Route path='/profile-settings' element={'Profile Settings'} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;