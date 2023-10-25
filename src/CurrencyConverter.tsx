import React from 'react';
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

interface State {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number | null;
  currencies: Currencies;
}

class CurrencyConverter extends React.Component<ExProps, State> {
  static defaultProps = {
    initialCurrency: 'USD'
  };

  constructor(props: ExProps) {
    super(props);
    this.state = {
      fromCurrency: this.props.initialCurrency!,
      toCurrency: 'RUB',
      amount: 1,
      convertedAmount: null,
      currencies: {}
    };
  }

  componentDidMount() {
    this.loadCurrencies();
  }

  async loadCurrencies() {
    try {
      const data = await CurrencyService.fetchCurrencies();
      this.setState({ currencies: data });
    } catch (error) {
      console.error("Ошибка при загрузке валют:", error);
    }
  }

  getOptions(currenciesData: Currencies) {
    return Object.keys(currenciesData).map(currencyCode => ({
      value: currencyCode,
      label: `${currenciesData[currencyCode].name} (${currencyCode})`
    }));
  }

  async handleConversion() {
    try {
      const exchangeRate = await CurrencyService.calculateConversion(this.state.fromCurrency, this.state.toCurrency);
      this.setState({ convertedAmount: this.state.amount * exchangeRate });
    } catch (error) {
      console.error("Ошибка при конвертации:", error);
    }
  }

  render() {
    return (
      <div className="currency-converter">
        <CurrencyInput 
          value={this.state.amount} 
          onChange={(value) => this.setState({ amount: value })} 
        />
        <Dropdown
          options={this.getOptions(this.state.currencies)}
          selectedValue={this.state.fromCurrency}
          onSelect={(value) => this.setState({ fromCurrency: value })}
        />
        <Dropdown
          options={this.getOptions(this.state.currencies)}
          selectedValue={this.state.toCurrency}
          onSelect={(value) => this.setState({ toCurrency: value })}
        />
        <ConvertButton onClick={() => this.handleConversion()} />
        <ConversionResult 
          value={this.state.convertedAmount} 
          currency={this.state.toCurrency} 
        />
      </div>
    );
  }
}

export default CurrencyConverter;