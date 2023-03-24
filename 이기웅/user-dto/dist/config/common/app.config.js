"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const common_1 = require("@nestjs/common");
function setupApp(app) {
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors) => { },
    }));
}
exports.setupApp = setupApp;
//# sourceMappingURL=app.config.js.map