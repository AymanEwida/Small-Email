import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NavbarContextProvider } from './context/navbar-context/NavbarContext';
import { AccountsContextProvider } from './context/accounts-context/AccountsContext';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AccountsContextProvider>
      <NavbarContextProvider>
        <App />
      </NavbarContextProvider>
    </AccountsContextProvider>
  </React.StrictMode>
);
