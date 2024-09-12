import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import "../assets/styles/Currency.css";
import axios from "axios";

const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_4fynr6niLewAlzGqpPFYwGC5AoKfdmy8fcnD235B";

export default function CurrencyConverter() {
  const [inputAmount, setInputAmount] = useState(""); // Kullanıcının girdiği miktar
  const [convertedAmount, setConvertedAmount] = useState(""); // Dönüştürülen miktar
  const [baseCurrency, setBaseCurrency] = useState("USD"); // Temel döviz birimi
  const [targetCurrency, setTargetCurrency] = useState("TRY"); // Hedef döviz birimi

  // Dönüşüm işlemini gerçekleştiren fonksiyon
  const handleConversion = async () => {
    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${baseCurrency}`
    );

    const exchangeRate = response.data.data[targetCurrency];
    const calculatedAmount = exchangeRate * inputAmount;

    setConvertedAmount(calculatedAmount.toFixed(2));
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="currency-inputs">
        <div className="input-group">
          <select
            name="baseCurrency"
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="TRY">TRY</option>
          </select>
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
          />
        </div>
        <FaExchangeAlt style={{ color: "#fff" }} />
        <div className="input-group">
          <select
            name="targetCurrency"
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="TRY">TRY</option>
          </select>
          <input type="number" value={convertedAmount} readOnly />
        </div>
      </div>
      <button onClick={handleConversion}>Convert</button>
    </div>
  );
}
