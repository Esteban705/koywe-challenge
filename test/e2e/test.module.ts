import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { QuotesRepository } from '@/dal/quotes.repository';
import { DummyQuotesRepository } from '@/dal/dummy/quotes.repository.dummy';
import { QuotesService } from '@/bll/quotes.service';
import { QuotesFacade } from '@/facades/implementations/quotes.facade';
import { QuotesController } from '@/facades/controllers/quotes.controller';
import { AuthController } from '@/facades/controllers/auth.controller';
import { UsersService } from '@/bll/users.service';
import { AuthService } from '@/bll/auth.service';
import { AuthFacade } from '@/facades/implementations/auth.facade';
import { UsersRepository } from '@/dal/users.repositoy';
import { DummyUsersRepository } from '@/dal/dummy/users.repository.dummy';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DummyCacheManager } from '@/dal/dummy/cache-manager.dummy';
import { ExchangeRateFacade } from '@/providers/exchange-rate/exchange-rate.facade';
import { DummyExchangeRateFacade } from '@/dal/dummy/exchange-rate.facade.dummy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.test',
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'test-secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [QuotesController, AuthController],
  providers: [
    QuotesService,
    QuotesFacade,
    UsersService,
    AuthService,
    AuthFacade,
    {
      provide: QuotesRepository,
      useClass: DummyQuotesRepository
    },
    {
      provide: UsersRepository,
      useClass: DummyUsersRepository
    },
    {
      provide: CACHE_MANAGER,
      useValue: DummyCacheManager
    },
    {
      provide: ExchangeRateFacade,
      useClass: DummyExchangeRateFacade
    },
    JwtStrategy
  ]
})
export class TestModule { }

