import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Quote } from 'src/models/entities/quote.schema';
import { CreateQuoteDto } from 'src/models/dtos/create-quote.dto';
import { IQuotesRepository } from '../interfaces/quotes.facade.interface';
import { QuotesService } from '../../bll/quotes.service';

@Injectable()
export class QuotesFacade implements IQuotesRepository {
  constructor(
    private readonly quotesService: QuotesService
  ) {}


  async createQuote(createQuoteDto: CreateQuoteDto, userId: string): Promise<Quote> {
    try {
      return await this.quotesService.createQuote(createQuoteDto, userId);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al crear la cotización');
    }
  }

  async getQuote(id: string, userId: string): Promise<Quote> {
    try {
      const quote = await this.quotesService.getQuote(id, userId);
      if (!quote) {
        throw new NotFoundException('Cotización no encontrada o expirada');
      }
      return quote;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al buscar la cotización');
    }
  }
}