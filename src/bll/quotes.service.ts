import { Inject, Injectable } from '@nestjs/common';
import { QuotesRepository } from 'src/dal/quotes.repository';
import { ExchangeRateFacade } from 'src/providers/exchange-rate/exchange-rate.facade';
import { CreateQuoteDto } from 'src/models/dtos/create-quote.dto';
import { Quote } from 'src/models/entities/quote.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class QuotesService {
  constructor(
    private readonly quotesRepository: QuotesRepository,
    private readonly exchangeRateFacade: ExchangeRateFacade,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async createQuote(createQuoteDto: CreateQuoteDto, userId: string): Promise<Quote> {

    const cacheKey = `rate:${createQuoteDto.from}:${createQuoteDto.to}`;

    let rate: number = await this.cacheManager.get(cacheKey);

    if (!rate) {
      rate = await this.exchangeRateFacade.getExchangeRate(
        createQuoteDto.from,
        createQuoteDto.to
      );

      await this.cacheManager.set(cacheKey, rate);
    }

    const convertedAmount = this.convertAmount(createQuoteDto.amount, rate);

    const timestamp = new Date();
    const expiresAt = new Date(timestamp.getTime() + 5 * 60000);

    const quoteData = {
      userId,
      from: createQuoteDto.from,
      to: createQuoteDto.to,
      amount: createQuoteDto.amount,
      rate,
      convertedAmount,
      timestamp,
      expiresAt,
    };


    return this.quotesRepository.createQuote(quoteData, userId);
  }

  private convertAmount(amount: number, rate: number): number {
    return amount * rate;
  }


  async getQuote(id: string, userId: string): Promise<Quote> {
    return this.quotesRepository.getQuote(id, userId);
  }

  // Método adicional para obtener monedas soportadas
  async getSupportedCurrencies(): Promise<string[]> {
    return this.exchangeRateFacade.getSupportedCurrencies();
  }
}