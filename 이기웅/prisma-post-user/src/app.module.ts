import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/config/env.validation';

import { AppController } from './app.controller';
import { PrismaModule } from './database';

import { JwtModule } from '@nestjs/jwt';
import Modules from './modules';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
      envFilePath: '.env',
    }),
    ...Modules,
  ],
  controllers: [AppController],
})
export class AppModule {}
