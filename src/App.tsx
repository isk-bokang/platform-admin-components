import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { ContractListDiv } from './components/contracts/ContractsDiv';
import { ChainListDiv } from './components/contracts/ChainDiv';

function App() {
  const [obj, setObj] = useState<any>()


  function onClickApiCall(){
    axios.get("http://localhost:8090/contracts/")
    .then( (value)=>{
      console.log(value)
      setObj(value.data)
    } )
    .catch( (err)=>{
      console.error(err)
    })


  }

  return (
    <div className="App">
      <button onClick={onClickApiCall}> PRINT </button>
      {obj && <p> {Object(obj).toString()}</p>}
      <hr/>
      <ContractListDiv/>
      <hr/>
      <ChainListDiv/>
    </div>
    
  );
}

export default App;
