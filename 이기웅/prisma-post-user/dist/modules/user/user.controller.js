"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const create_user_response_dto_1 = require("./dto/create-user-response.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUser(userId) {
        return await this.userService.getUser(userId);
    }
    async getUsers(searchName) {
        return await this.userService.getUsers(searchName);
    }
    async createUser(createUserDto) {
        return await this.userService.createUser(createUserDto);
    }
    async updateUser(userId, updateUserDto) {
        return await this.userService.updateUser(userId, updateUserDto);
    }
    async deleteUser(userId) {
        return await this.userService.deleteUser(userId);
    }
};
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_dto_1.UserDto }),
    (0, swagger_1.ApiOperation)({ summary: 'userId로 사용자 조회' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '사용자 전체 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [user_dto_1.UserDto] }),
    (0, swagger_1.ApiQuery)({
        name: 'searchName',
        required: false,
        description: '검색할 이름',
        example: '홍길동',
    }),
    __param(0, (0, common_1.Query)('searchName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '사용자 생성' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: create_user_response_dto_1.CreateUserResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'userId로 사용자 수정' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'userId로 사용자 삭제' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map