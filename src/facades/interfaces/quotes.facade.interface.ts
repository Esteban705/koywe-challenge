import { Quote } from 'src/models/entities/quote.schema';
import { CreateQuoteDto } from 'src/models/dtos/create-quote.dto';

export interface IQuotesRepository {
  createQuote(createQuoteDto: CreateQuoteDto, userId: string): Promise<Quote>;
  getQuote(id: string, userId: string): Promise<Quote>;
}