import { INestApplication } from '@nestjs/common';
import { AllExceptionsFilter } from './global-exception-filter.filter';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

export function setGlobalFilters<T extends INestApplication>(app: T) {
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
}
