import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // MEMO: whitelist는 DTO에 포함되어있지 않은 속성은 자동으로 제거
  // MEMO: transform: DTO의 auto-transformation을 가능케 함
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(8080);
}
bootstrap();
