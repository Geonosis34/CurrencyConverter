import React, { useState, useEffect } from 'react';
import Dropdown from './Components/Dropdown';
import CurrencyInput from './Components/CurrencyInput';
import ConversionResult from './Components/ConversionResult';
import ConvertButton from './Components/ConvertButton';
import CurrencyService from './Components/CurrencyService';

interface ExProps {
  initialCurrency?: string;
}

interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

interface Currencies {
  [key: string]: Currency;
}

const CurrencyConverter: React.FC<ExProps> = ({ initialCurrency = 'USD' }) => {
  const [fromCurrency, setFromCurrency] = useState<string>(initialCurrency);
  const [toCurrency, setToCurrency] = useState<string>('RUB');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<Currencies>({});

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await CurrencyService.fetchCurrencies();
        setCurrencies(data);
      } catch (error) {
        console.error("Ошибка при загрузке валют:", error);
      }
    };
    loadCurrencies();
  }, []);

  const getOptions = (currenciesData: Currencies) => {
    return Object.keys(currenciesData).map(currencyCode => ({
      value: currencyCode,
      label: `${currenciesData[currencyCode].name} (${currencyCode})`
    }));
  };

  const handleConversion = async () => {
    try {
      const exchangeRate = await CurrencyService.calculateConversion(fromCurrency, toCurrency);
      setConvertedAmount(amount * exchangeRate);
    } catch (error) {
      console.error("Ошибка при конвертации:", error);
    }
  };

  return (
    <div className="currency-converter">
      <CurrencyInput 
        value={amount} 
        onChange={setAmount} 
      />
      <Dropdown
        options={getOptions(currencies)}
        selectedValue={fromCurrency}
        onSelect={setFromCurrency}
      />
      <Dropdown
        options={getOptions(currencies)}
        selectedValue={toCurrency}
        onSelect={setToCurrency}
      />
      <ConvertButton onClick={handleConversion} />
      <ConversionResult 
        value={convertedAmount} 
        currency={toCurrency} 
      />
    </div>
  );
}

export default CurrencyConverter;