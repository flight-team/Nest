import { INestApplication } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export function setGlobalGuards<T extends INestApplication>(app: T) {
  app.useGlobalGuards(
    new JwtAuthGuard(new Reflector(), new JwtService(), new ConfigService()),
  );
}

export { JwtAuthGuard } from './jwt-auth.guard';
export { LocalAuthGuard } from './local-auth.guard';
