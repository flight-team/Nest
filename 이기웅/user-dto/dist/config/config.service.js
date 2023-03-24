"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv = require("dotenv");
const fs = require("fs");
class ConfigService {
    constructor(filePath) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }
    get(key) {
        return this.envConfig[key];
    }
    isEnv(env) {
        return this.nodeEnv === env;
    }
    get nodeEnv() {
        return process.env.NODE_ENV || "development";
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map