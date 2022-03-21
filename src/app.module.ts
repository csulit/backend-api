import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authEnv from 'src/auth/config/auth.config';
import { AuthModule } from './auth/auth.module';
import { PrismaClientModule } from './prisma-client/prisma-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authEnv],
    }),
    PrismaClientModule,
    AuthModule,
  ],
})
export class AppModule {}
