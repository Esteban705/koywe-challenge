import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Quote, QuoteDocument } from 'src/models/entities/quote.schema';
import { CreateQuoteDto } from 'src/models/dtos/create-quote.dto';
import { IQuotesRepository } from '../facades/interfaces/quotes.facade.interface';

@Injectable()
export class QuotesRepository implements IQuotesRepository {
  constructor(
    @InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>,
  ) {}

  async createQuote(createQuoteDto: CreateQuoteDto, userId: string): Promise<Quote> {
    const createdQuote = new this.quoteModel({...createQuoteDto, _id: new Types.ObjectId(), userId});
    return createdQuote.save();
  }



  async getQuote(id: string, userId: string): Promise<Quote | null> {
    return this.quoteModel.findOne({
      _id: id,
      userId,
      expiresAt: { $gt: new Date() }
    }).exec();
  }
}
