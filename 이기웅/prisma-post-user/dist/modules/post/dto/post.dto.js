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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDto = void 0;
const user_dto_1 = require("../../user/dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
class PostDto {
    constructor(args) {
        this.id = args.id;
        this.title = args.title;
        this.content = args.content;
        this.createdAt = args.createdAt;
        this.updatedAt = args.updatedAt;
        this.user = args.User;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], PostDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], PostDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'string', nullable: true }),
    __metadata("design:type", String)
], PostDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], PostDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], PostDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_dto_1.UserDto }),
    __metadata("design:type", user_dto_1.UserDto)
], PostDto.prototype, "user", void 0);
exports.PostDto = PostDto;
//# sourceMappingURL=post.dto.js.map