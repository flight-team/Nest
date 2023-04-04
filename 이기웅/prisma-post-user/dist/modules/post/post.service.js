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
const post_dto_1 = require("./dto/post.dto");
const user_service_1 = require("../user/user.service");
let PostService = class PostService {
    constructor(prisma, userService) {
        this.prisma = prisma;
        this.userService = userService;
    }
    async getPost() { }
    async getPosts(search) {
        const posts = await this.prisma.post.findMany({
            where: {
                title: {
                    contains: search,
                },
                content: {
                    contains: search,
                },
            },
            include: {
                User: true,
            },
        });
        return posts.map((post) => new post_dto_1.PostDto(post));
    }
    async createPost(createPostDto) {
        await this.userService.getUser(createPostDto.userId);
        const createdPost = await this.prisma.post.create({
            data: createPostDto,
        });
        return { id: createdPost.id };
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map