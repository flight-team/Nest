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
exports.UserService = void 0;
const prisma_service_1 = require("../../database/prisma.service");
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./dto/user.dto");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkNameDuplicated(name, updateUserId) {
        const foundUserUsingName = await this.prisma.user.findFirst({
            where: { name, NOT: { id: updateUserId } },
        });
        if (foundUserUsingName)
            throw new common_1.BadRequestException('이미 존재하는 이름입니다.');
        return false;
    }
    async getUser(id) {
        const foundUser = await this.prisma.user.findFirst({
            where: { id },
        });
        if (!foundUser)
            throw new common_1.NotFoundException(`${id}에 해당하는 사용자가 존재하지 않습니다`);
        return new user_dto_1.UserDto(foundUser);
    }
    async getUsers(searchName) {
        const users = await this.prisma.user.findMany({
            where: {
                name: {
                    contains: searchName,
                },
            },
        });
        return users.map((user) => new user_dto_1.UserDto(user));
    }
    async createUser(createUserDto) {
        await this.checkNameDuplicated(createUserDto.name);
        const createdUser = await this.prisma.user.create({ data: createUserDto });
        return { id: createdUser.id };
    }
    async updateUser(id, updateUserDto) {
        await this.getUser(id);
        await this.checkNameDuplicated(updateUserDto.name, id);
        await this.prisma.user.update({
            data: updateUserDto,
            where: { id },
        });
    }
    async deleteUser(id) {
        await this.getUser(id);
        await this.prisma.user.delete({ where: { id } });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map