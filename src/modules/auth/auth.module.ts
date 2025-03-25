import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users.module";
import { AuthController } from "src/facades/controllers/auth.controller";
import { AuthFacade } from "src/facades/implementations/auth.facade";
import { AuthService } from "src/bll/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { Module } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthFacade, AuthService, JwtStrategy],
  exports: [AuthFacade],
})
export class AuthModule {}