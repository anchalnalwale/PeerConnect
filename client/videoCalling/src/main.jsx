import React from 'react'
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './context/SocketProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <App/>
      </SocketProvider>
    </BrowserRouter>
  </StrictMode>,
);
