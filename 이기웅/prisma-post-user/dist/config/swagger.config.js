"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Post User Swagger API')
        .setDescription('프리즈마 연결해보기 티 비')
        .setVersion('1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.config.js.map