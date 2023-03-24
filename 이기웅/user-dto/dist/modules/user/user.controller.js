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
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAll(res) {
        const users = this.userService.getAll();
        res.status(common_1.HttpStatus.OK).json({ users });
    }
    create(dto, res) {
        const createdUserId = this.userService.create(dto);
        res.status(common_1.HttpStatus.CREATED).json({ id: createdUserId });
    }
    getOne(id, res) {
        const user = this.userService.getOne(id);
        res.status(common_1.HttpStatus.OK).json({ user });
    }
    update(id, dto, res) {
        this.userService.update(id, dto);
        res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
    deleteOne(id, res) {
        this.userService.deleteOne(id);
        res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "모든 유저 조회" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "조회" }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "유저 생성" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "생성" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "userId를 통한 단일 유저 조회" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "조회" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "없을 경우" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "userId를 통한 단일 유저 업데이트" }),
    (0, swagger_1.ApiResponse)({ status: 204, description: "생성" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "없을 경우" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "userId를 통한 단일 유저 삭제" }),
    (0, swagger_1.ApiResponse)({ status: 204, description: "삭제" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "없을 경우" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteOne", null);
UserController = __decorate([
    (0, common_1.Controller)("users"),
    (0, swagger_1.ApiTags)("유저"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map