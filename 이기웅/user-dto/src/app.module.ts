import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "./config";
import { Modules } from "./modules";

@Module({
  imports: [...Modules, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
