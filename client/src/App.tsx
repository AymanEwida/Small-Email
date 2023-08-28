import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import Cookies from 'js-cookie';

import {
  Home,
  MainPage, 
  ChooseAccount,
  ProfileSettings,
  Register,
  Login,
  Test
} from './pages'

import './App.css';

const App: React.FC = () => {

  const [user] = useState(typeof Cookies.get('username') === 'string' ? true : false);

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    }
  });

  return (
    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' index element={user ? <Navigate to='/inbox' /> : <Home />} />
          <Route path='/*' element={user ? <MainPage /> : <Navigate to='/' />} />
          <Route path='/choose-account' element={user ? <Navigate to='/inbox' /> : <ChooseAccount />} />
          <Route path='/login' element={user ? <Navigate to='/inbox' /> : <Login />} />
          <Route path='/register' element={user ? <Navigate to='/inbox' /> : <Register />} />
          <Route path='/profile-settings' element={user ? <ProfileSettings /> : <Navigate to='/' />} />

          {/* this route for testing */}
          <Route path='/test' element={<Test />} /> 
        </Routes>
      </Router>
    </QueryClientProvider>

  );
}

export default App;