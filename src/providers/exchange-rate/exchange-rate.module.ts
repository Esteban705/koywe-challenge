import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateFacade } from './exchange-rate.facade';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  providers: [
    ExchangeRateService,
    ExchangeRateFacade,
  ],
  exports: [ExchangeRateFacade],
})
export class ExchangeRateModule {}