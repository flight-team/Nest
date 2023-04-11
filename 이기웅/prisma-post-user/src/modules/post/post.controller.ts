import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { CreatePostResponseDto } from './dto/create-post-response.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsQueryDto } from './dto/get-posts-query.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Get(':id')
  @ApiResponse({ status: 200, type: PostDto })
  @ApiOperation({ summary: 'postId로 게시물 조회' })
  async getPost(@Param('id') id: string) {
    return await this.postService.getPost(id);
  }

  // NOTE: 이거 query 안보내면 작동을 안하는데 왜인지 전혀 모르겠는 1인
  @Get()
  @ApiResponse({ status: 200, type: [PostDto] })
  @ApiOperation({ summary: '게시물 전체 조회' })
  async getPosts(@Query() query: GetPostsQueryDto) {
    if (query.userId) await this.userService.getUser(query.userId);

    return await this.postService.getPosts({
      where: {
        OR: [
          {
            title: {
              contains: query.title,
            },
          },
          {
            content: {
              contains: query.content,
            },
          },
          {
            userId: query.userId,
          },
        ],
      },
      include: { user: true },
    });
  }

  @Post()
  @ApiResponse({ status: 201, type: CreatePostResponseDto })
  @ApiOperation({ summary: '게시물 생성' })
  @HttpCode(201)
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'postId로 게시물 수정' })
  @HttpCode(204)
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'postId로 게시물 삭제' })
  @HttpCode(204)
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
