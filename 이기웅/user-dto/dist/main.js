"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
const common_1 = require("./config/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    (0, common_1.setupApp)(app);
    app.use((0, helmet_1.default)());
    app.enableCors();
    (0, common_1.setupSwagger)(app);
    const port = configService.get("APP_PORT");
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map