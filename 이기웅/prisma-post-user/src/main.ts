import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { setGlobalInterceptors } from '@/common/interceptors';
import { AppModule } from './app.module';
import { setGlobalGuards } from './common/guards';
import { setupApp } from './config/app.config';
import { setupSwagger } from './config/swagger.config';
import { PrismaService } from './database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);

  setupApp(app);
  setupSwagger(app);
  setGlobalInterceptors(app);
  setGlobalGuards(app);

  await prismaService.enableShutdownHooks(app);

  await app.listen(configService.get<number>('PORT'), () => {
    console.info(`Listening on port ${configService.get<number>('PORT')} 🚀`);
  });
}

bootstrap();
