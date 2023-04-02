import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { PrismaService } from './database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app);

  await app.listen(configService.get<number>('PORT'), () => {
    console.info(`Listening on port ${configService.get<number>('PORT')} 🚀`);
  });
}

bootstrap();
