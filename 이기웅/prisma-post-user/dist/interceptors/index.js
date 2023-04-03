"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalInterceptors = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
function setGlobalInterceptors(app) {
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
}
exports.setGlobalInterceptors = setGlobalInterceptors;
//# sourceMappingURL=index.js.map