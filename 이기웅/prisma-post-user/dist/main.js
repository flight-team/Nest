"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_config_1 = require("./config/app.config");
const swagger_config_1 = require("./config/swagger.config");
const database_1 = require("./database");
const interceptors_1 = require("./interceptors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const prismaService = app.get(database_1.PrismaService);
    (0, app_config_1.setupApp)(app);
    (0, swagger_config_1.setupSwagger)(app);
    (0, interceptors_1.setGlobalInterceptors)(app);
    await prismaService.enableShutdownHooks(app);
    await app.listen(configService.get('PORT'), () => {
        console.info(`Listening on port ${configService.get('PORT')} 🚀`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map