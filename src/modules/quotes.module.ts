import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { QuotesController } from '../facades/controllers/quotes.controller';
import { QuotesService } from '../bll/quotes.service';
import { QuotesRepository } from '../dal/quotes.repository';
import { Quote, QuoteSchema } from '../models/entities/quote.schema';
import { ExchangeRateModule } from '../providers/exchange-rate/exchange-rate.module';
import { QuotesFacade } from 'src/facades/implementations/quotes.facade';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
    ExchangeRateModule, // Importamos el módulo de Exchange Rate
    CacheModule.register(), // Agregamos esto nuevamente
  ],
  controllers: [QuotesController],
  providers: [
    QuotesRepository,
    QuotesService,
    QuotesFacade,
  ],
  exports: [QuotesFacade],
})
export class QuotesModule {}