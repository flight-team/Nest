import { INestApplication, ValidationPipe } from "@nestjs/common";

export function setupApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // MEMO: 전역 에러 처리
      exceptionFactory: (errors) => {},
    })
  );
}
