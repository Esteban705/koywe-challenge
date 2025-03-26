export interface IExchangeRateService {
    getExchangeRate(fromCurrency: string, toCurrency?: string): Promise<number>;
    convertAmount(amount: number, fromCurrency: string, toCurrency: string): Promise<number>;
    getSupportedCurrencies(): Promise<string[]>;
  }