import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export function setGlobalInterceptors<T extends INestApplication>(app: T) {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}

export { ResponseInterceptor } from './response.interceptor';
export { ResponseWithIdInterceptor } from './response-with-id.interceptor';
