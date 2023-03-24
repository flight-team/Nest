import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Module({
  providers: [
    {
      provide: ConfigService,
      // NOTE: 보통 MOCKING 하거나, 값을 직접 넣어서 쓸 때
      useValue: new ConfigService(".env"),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
