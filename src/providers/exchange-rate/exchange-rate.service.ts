import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IExchangeRateService } from './exchange-rate.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeRateService implements IExchangeRateService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('EXCHANGE_RATE_API_KEY');
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
  }

  async getExchangeRate(fromCurrency: string, toCurrency: string = 'USD'): Promise<number> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/${fromCurrency.toUpperCase()}`)
      );

      const rate = response.data.rates[toCurrency.toUpperCase()];
      if (!rate) {
        throw new HttpException(
          `Exchange rate not found for ${fromCurrency} to ${toCurrency}`,
          HttpStatus.NOT_FOUND
        );
      }

      return rate;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error fetching exchange rate',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async convertAmount(
    amount: number,
    fromCurrency: string,
    toCurrency: string = 'USD'
  ): Promise<number> {
    const rate = await this.getExchangeRate(fromCurrency, toCurrency);
    return amount * rate;
  }

  async getSupportedCurrencies(): Promise<string[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/USD`)
      );
      return Object.keys(response.data.rates);
    } catch (error) {
      throw new HttpException(
        'Error fetching supported currencies',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}