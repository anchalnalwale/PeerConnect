import React from 'react'
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router'
import './index.css'
import App from './App.jsx'
// import reportWebVitals from './reportWebVitals'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
);
