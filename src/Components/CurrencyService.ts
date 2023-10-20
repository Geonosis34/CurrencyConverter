import axios from 'axios';

const API_KEY = 'fca_live_1ixQs5heSqJV1ByfDpwUGXbdJNd8KnaslxVmnSq6';
const BASE_URL = 'https://api.freecurrencyapi.com/v1';

const headers = {
  'apikey': API_KEY
};

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

class CurrencyService {
  static async fetchCurrencies(): Promise<Currencies> {
    try {
      const response = await axios.get(`${BASE_URL}/currencies`, { headers });
      return response.data.data;
    } catch (error) {
      console.error("Ошибка при получении информации о валютах:", error);
      throw error;
    }
  };

  static async calculateConversion(fromCurrency: string, toCurrency: string): Promise<number> {
    try {
      const response = await axios.get(`${BASE_URL}/latest`, {
        params: {
          from: fromCurrency,
          to: toCurrency
        },
        headers
      });
      return response.data.data[toCurrency];
    } catch (error) {
      console.error("Ошибка при конвертации:", error);
      throw error;
    }
  };
}

export default CurrencyService;