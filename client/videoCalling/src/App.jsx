import React from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import { useState } from 'react'
import Lobby from './screens/Lobby'
import './App.css'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Lobby/>}/>
      </Routes>
    </div>
  )
}

export default App
