import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupApp } from './config/app.config';
import { setupSwagger } from './config/swagger.config';
import { PrismaService } from './database';
import { setGlobalInterceptors } from './interceptors';

// NOTE: getUser시 password 제외하기 위해 interceptor를 보통 쓰는 것 같은데, @ignore 방식도 괜찮은지?
// NOTE: DTO serialize interceptor 방식을 어떻게 하는 것이 좋은지
// NOTE: pagination 구현할 때 Reflect-metadata 이용해서 response DTO interceptor를 다르게 적용하고 싶어요 티비

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
