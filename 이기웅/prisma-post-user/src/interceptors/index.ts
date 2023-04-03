import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export function setGlobalInterceptors<T extends INestApplication>(app: T) {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}
