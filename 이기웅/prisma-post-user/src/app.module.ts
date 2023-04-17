import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/config/env.validation';

import { AppController } from './app.controller';
import { PrismaModule } from './database';

import Modules from './modules';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common';
import { JwtModule } from '@nestjs/jwt';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
