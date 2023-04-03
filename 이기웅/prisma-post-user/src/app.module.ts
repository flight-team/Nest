import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/config/env.validation';

import { AppController } from './app.controller';
import { PrismaModule } from './database';

import Modules from './modules';

@Module({
  imports: [
    PrismaModule,
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
