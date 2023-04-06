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
exports.PostService = void 0;
const prisma_service_1 = require("../../database/prisma.service");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const post_dto_1 = require("./dto/post.dto");
let PostService = class PostService {
    constructor(prisma, userService) {
        this.prisma = prisma;
        this.userService = userService;
    }
    async checkTitleDuplicated(title, updatePostId) {
        const foundPostUsingTitle = await this.prisma.post.findFirst({
            where: { title, NOT: { id: updatePostId } },
        });
        if (foundPostUsingTitle)
            throw new common_1.BadRequestException('이미 존재하는 제목입니다.');
        return false;
    }
    async getPost(id) {
        const post = await this.prisma.post.findFirst({
            where: { id },
            include: {
                User: true,
            },
        });
        if (!post)
            throw new common_1.NotFoundException(`${id}에 해당하는 게시물이 존재하지 않습니다.`);
        return new post_dto_1.PostDto(post);
    }
    async getPosts(title, content, userId) {
        if (userId)
            this.userService.getUser(userId);
        const posts = await this.prisma.post.findMany({
            where: Object.assign(Object.assign(Object.assign({}, (!!title && {
                title: {
                    contains: title,
                },
            })), (!!content && {
                content: {
                    contains: content,
                },
            })), (userId && { userId })),
            include: {
                User: true,
            },
        });
        return posts.map((post) => new post_dto_1.PostDto(post));
    }
    async createPost(createPostDto) {
        await this.userService.getUser(createPostDto.userId);
        await this.checkTitleDuplicated(createPostDto.title);
        const createdPost = await this.prisma.post.create({
            data: createPostDto,
        });
        return { id: createdPost.id };
    }
    async updatePost(id, updatePostDto) {
        await this.getPost(id);
        await this.checkTitleDuplicated(updatePostDto.title, id);
        if (updatePostDto === null || updatePostDto === void 0 ? void 0 : updatePostDto.userId) {
            await this.userService.getUser(updatePostDto.userId);
        }
        await this.prisma.post.update({
            where: { id },
            data: updatePostDto,
        });
    }
    async deletePost(id) {
        await this.getPost(id);
        await this.prisma.post.delete({
            where: { id },
        });
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map