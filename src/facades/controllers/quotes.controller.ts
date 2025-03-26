import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';

import { CreateQuoteDto } from 'src/models/dtos/create-quote.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { QuotesFacade } from '../implementations/quotes.facade';

@Controller('quote')
@UseGuards(JwtAuthGuard)
export class QuotesController {
  constructor(private readonly quoteFacade: QuotesFacade) {}

  @Post()
  async createQuote(@Body() createQuoteDto: CreateQuoteDto, @Request() req:any) {
    return this.quoteFacade.createQuote(createQuoteDto, req.user.userId);
  }

  @Get(':id')
  async getQuote(@Param('id') id: string, @Request() req:any) {
    return this.quoteFacade.getQuote(id, req.user.userId);
  }
} 