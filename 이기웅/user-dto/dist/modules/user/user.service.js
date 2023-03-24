"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor() {
        this.users = [];
    }
    create(dto) {
        const createdUser = Object.assign({ id: (0, uuid_1.v4)() }, dto);
        this.users.push(createdUser);
        return createdUser.id;
    }
    getAll() {
        return this.users;
    }
    getOne(id) {
        const user = this.users.find((user) => user.id === id);
        if (!user)
            throw new common_1.NotFoundException(`${id} ID 유저가 존재하지 않습니다.`);
        return user;
    }
    update(id, dto) {
        const user = this.getOne(id);
        this.deleteOne(id);
        const newUser = Object.assign(Object.assign({}, user), dto);
        this.users.push(newUser);
    }
    deleteOne(id) {
        this.getOne(id);
        this.users = this.users.filter((user) => user.id !== id);
        return true;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map