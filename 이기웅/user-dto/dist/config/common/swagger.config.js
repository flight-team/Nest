"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle("NestJS UserDTO")
        .setDescription("스웨거다 이자식아")
        .setVersion("1.0.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("api", app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.config.js.map