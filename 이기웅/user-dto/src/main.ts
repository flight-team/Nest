import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { ConfigService } from "./config";
import { setupApp, setupSwagger } from "./config/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  setupApp(app);

  app.use(helmet());
  app.enableCors();

  setupSwagger(app);

  const port = configService.get("APP_PORT");

  await app.listen(port);
}
bootstrap();
