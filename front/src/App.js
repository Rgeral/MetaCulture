import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './Test'; 
import MintNFT from './MintNFT'; 

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/mint-nft" element={<MintNFT />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
