import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import {
  Home,
  MainPage,
  ChooseAccount,
  ProfileSettings,
  Register,
  Test
} from './pages'

import './App.css';

const App: React.FC = () => {

  const [user, setUser] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path='/' index element={user ? <Navigate to='/inbox' /> : <Home />} />
        <Route path='/*' element={user ? <MainPage /> : <Navigate to='/' />} />
        <Route path='/choose-account' element={user ? <Navigate to='/inbox' /> : <ChooseAccount />} />
        <Route path='/register' element={user ? <Navigate to='/inbox' /> : <Register />} />
        <Route path='/profile-settings' element={user ? <ProfileSettings /> : <Navigate to='/' />} />

        {/* this route for testing */}
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;