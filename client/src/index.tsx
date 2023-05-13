import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NavbarContextProvider } from './context/navbar-context/NavbarContext';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NavbarContextProvider>
      <App />
    </NavbarContextProvider>
  </React.StrictMode>
);
