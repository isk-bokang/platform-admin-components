import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { ContractListDiv } from './components/contracts/ContractsDiv';
import { ChainListDiv } from './components/contracts/ChainDiv';
import { Router } from './components/Router';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router/>
    </div>

  );
}

export default App;
