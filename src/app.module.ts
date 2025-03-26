import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users.module';
import { QuotesModule } from './modules/quotes.module';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Conexión a MongoDB
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
          retryAttempts: 3,
          retryDelay: 1000,
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 10000,
      }),
    }),

    AuthModule,
    UsersModule,
    QuotesModule,
    CacheModule.register({
      useFactory: () => ({
        store: 'memory',
        ttl: 300,
        max: 100,
        isGlobal: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}