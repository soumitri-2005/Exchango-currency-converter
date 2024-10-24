import React, { useState } from 'react'
import CurrencyOptions from './CurrencyOptions'

function CurrencyForm(props) {
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("INR");
  // for from
  const handelFromChange = (event) => {
    setFromCurr(event.target.value);
  };
  // for to
  const handelToChange = (event) => {
    setToCurr(event.target.value);
  };

  // for amount
  const [amount, setAmount] = useState("100");
  const handelAmount = (e) => {
    setAmount(e.target.value);
  };

  const handelSwapCountry = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  const BASE_URL = "https://v6.exchangerate-api.com/v6/53dc0a4496e89d3b63440d9b/latest/";
  const [msg, setMsg] = useState("100 USD =  8410.63 INR");
  const updateExchangeRate = async () => {
    let amtVal = amount;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        setAmount(1);
    }

    const URL = `${BASE_URL}${fromCurr}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr];

    if (rate) {
        let finalAmount = (amtVal * rate).toFixed(2);
        setMsg(`${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`);
    } else {
        setMsg("Exchange rate not found.");
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    updateExchangeRate();
  }

    return (
      <>
        <form onSubmit={handelSubmit}>
          <div className="amount">
              <p>Enter amount</p>
              <input value={amount} type="number" onChange={handelAmount} />
              </div>
          <div className="dropdown">
              <div className="from">
                  <p>From</p>
                  <div className="select-container">
                      <CurrencyOptions selectedCurr={fromCurr} handelChange={handelFromChange}/>
                  </div>
              </div>
              <i className="fa-solid fa-arrow-right-arrow-left" onClick={handelSwapCountry}></i>
              <div className="to">
                  <p>To</p>
                  <div className="select-container">
                      <CurrencyOptions selectedCurr={toCurr} handelChange={handelToChange}/>
                  </div>
              </div>
          </div>
          <div className="msg">{msg}</div>
          <button onClick={updateExchangeRate}><span>Get Exchange Rate</span></button>
        </form>
      </>
    )
  }

export default CurrencyForm
