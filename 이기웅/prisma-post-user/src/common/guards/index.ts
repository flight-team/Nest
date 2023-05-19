import { INestApplication } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/modules/user/user.service';

export function setGlobalGuards<T extends INestApplication>(app: T) {
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  const configService = app.get(ConfigService);
  const userService = app.get(UserService);

  app.useGlobalGuards(
    new JwtAuthGuard(reflector, jwtService, configService, userService),
  );
}

export { JwtAuthGuard } from './jwt-auth.guard';
export { LocalAuthGuard } from './local-auth.guard';
