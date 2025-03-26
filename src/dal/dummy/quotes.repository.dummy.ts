import { Injectable } from '@nestjs/common';
import { Quote } from '../../models/entities/quote.schema';
import { CreateQuoteDto } from '../../models/dtos/create-quote.dto';
import { IQuotesRepository } from '../../facades/interfaces/quotes.facade.interface';

@Injectable()
export class DummyQuotesRepository implements IQuotesRepository {
  private quotes: Quote[] = [];

  async createQuote(createQuoteDto: CreateQuoteDto, userId: string): Promise<Quote> {

    const quote = {
      _id: '123',
      ...createQuoteDto,
      from: createQuoteDto.from,
      to: createQuoteDto.to,
      amount: createQuoteDto.amount,
      rate: createQuoteDto.rate,
      convertedAmount: createQuoteDto.convertedAmount,
      timestamp: createQuoteDto.timestamp,
      expiresAt: createQuoteDto.expiresAt,
      userId,
      createdAt: new Date(),
      updatedAt: new Date('2026-03-26T15:00:00.000Z'),
      toObject: function() {
        return { ...this };
      }
    } as Quote;
    
    this.quotes.push(quote);
    return quote;
  }

  async getQuote(id: string, userId: string): Promise<Quote | null> {
    const quote = this.quotes.find(
      q => q._id === id && 
      q.expiresAt > new Date()
    );
    return quote || null;
  }

  // Método auxiliar para limpiar los datos
  async clearAll(): Promise<void> {
    this.quotes = [];
  }
} 