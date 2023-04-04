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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { CreatePostResponseDto } from './dto/create-post-response.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @ApiResponse({ status: 200, type: PostDto })
  @ApiOperation({ summary: 'postId로 게시물 조회' })
  getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [PostDto] })
  @ApiOperation({ summary: '게시물 전체 조회' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: '제목 or 내용 검색',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: '사용자 ID',
  })
  getPosts(@Query('search') search?: string, @Query('userId') userId?: string) {
    return this.postService.getPosts(search, userId);
  }

  @Post()
  @ApiResponse({ status: 201, type: CreatePostResponseDto })
  @ApiOperation({ summary: '게시물 생성' })
  @HttpCode(201)
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'postId로 게시물 수정' })
  @HttpCode(204)
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'postId로 게시물 삭제' })
  @HttpCode(204)
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
