import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './Test';
import './App.css'
import Chatbox from './chatbox';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/chat" element ={<Chatbox />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
