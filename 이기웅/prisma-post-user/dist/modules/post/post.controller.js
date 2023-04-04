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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const post_dto_1 = require("./dto/post.dto");
const post_service_1 = require("./post.service");
const create_post_response_dto_1 = require("./dto/create-post-response.dto");
const create_post_dto_1 = require("./dto/create-post.dto");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    getPost(id) {
        return this.postService.getPost(id);
    }
    getPosts(search) {
        return this.postService.getPosts(search);
    }
    createPost(createPostDto) {
        return this.postService.createPost(createPostDto);
    }
    updatePost(id, updatePostDto) {
        return this.postService.updatePost(id, updatePostDto);
    }
    deletePost(id) {
        return this.postService.deletePost(id);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: post_dto_1.PostDto }),
    (0, swagger_1.ApiOperation)({ summary: 'postId로 게시물 조회' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPost", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, type: [post_dto_1.PostDto] }),
    (0, swagger_1.ApiOperation)({ summary: '게시물 전체 조회' }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: '제목 or 내용 검색',
    }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, type: create_post_response_dto_1.CreatePostResponseDto }),
    (0, swagger_1.ApiOperation)({ summary: '게시물 생성' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, swagger_1.ApiOperation)({ summary: 'postId로 게시물 수정' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, swagger_1.ApiOperation)({ summary: 'postId로 게시물 삭제' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deletePost", null);
PostController = __decorate([
    (0, swagger_1.ApiTags)('Post'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map