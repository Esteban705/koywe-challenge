import { Injectable } from '@nestjs/common';
import { IExchangeRateService } from './exchange-rate.interface';
import { ExchangeRateService } from './exchange-rate.service';

@Injectable()
export class ExchangeRateFacade implements IExchangeRateService {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  async getExchangeRate(fromCurrency: string, toCurrency?: string): Promise<number> {
    return this.exchangeRateService.getExchangeRate(fromCurrency, toCurrency);
  }

  async convertAmount(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> {
    return this.exchangeRateService.convertAmount(amount, fromCurrency, toCurrency);
  }

  async getSupportedCurrencies(): Promise<string[]> {
    return this.exchangeRateService.getSupportedCurrencies();
  }
}