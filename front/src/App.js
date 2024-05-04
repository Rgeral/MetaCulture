import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importez BrowserRouter, Routes et Route
import MintNFT from './MintNFT'; // Importez votre composant de page de test

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mint-nft" element={<MintNFT />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
