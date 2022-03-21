import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import rateLimitExceededSerializer from 'src/common/serializer/rate-limit.serializer';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategyService } from './strategies/at.strategy';
import { RtStrategyService } from './strategies/rt.strategy';

@Module({
  imports: [
    PrismaClientModule,
    RateLimiterModule.register({
      keyPrefix: 'global-auth',
      points: 200,
      duration: 100,
      customResponseSchema: () => rateLimitExceededSerializer(),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const {
          ACCESS_TOKEN_SECRET_KEY,
          ACCESS_TOKEN_SECRET_KEY_EXPIRES_IN,
          JWT_ISSUER,
        } = configService.get<{
          ACCESS_TOKEN_SECRET_KEY: string;
          ACCESS_TOKEN_SECRET_KEY_EXPIRES_IN: string;
          JWT_ISSUER: string;
        }>('auth');

        return {
          secret: ACCESS_TOKEN_SECRET_KEY,
          signOptions: {
            expiresIn: ACCESS_TOKEN_SECRET_KEY_EXPIRES_IN,
          },
          JWT_ISSUER,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategyService,
    RtStrategyService,
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AuthModule {}
