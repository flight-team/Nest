import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupApp } from './config/app.config';
import { setupSwagger } from './config/swagger.config';
import { PrismaService } from './database';
import { setGlobalInterceptors } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);

  setupApp(app);
  setupSwagger(app);
  setGlobalInterceptors(app);

  await prismaService.enableShutdownHooks(app);

  await app.listen(configService.get<number>('PORT'), () => {
    console.info(`Listening on port ${configService.get<number>('PORT')} 🚀`);
  });
}

bootstrap();
