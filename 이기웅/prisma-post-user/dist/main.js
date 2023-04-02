"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const database_1 = require("./database");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const prismaService = app.get(database_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    await app.listen(configService.get('PORT'), () => {
        console.info(`Listening on port ${configService.get('PORT')} 🚀`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map