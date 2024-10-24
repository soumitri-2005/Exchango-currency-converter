import React from 'react';
import CurrencyForm from './components/CurrencyForm';
import './App.css';

function App() {

  return (
    <>
      <div className="container">
        <p id="title">CURRENCY CONVERTER</p>
        <CurrencyForm />
    </div>
    </>
  );
}

export default App;