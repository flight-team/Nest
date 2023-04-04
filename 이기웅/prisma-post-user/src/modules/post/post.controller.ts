import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { CreatePostResponseDto } from './dto/create-post-response.dto';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @Get(':postId')
  // getPost(@Param('postId') postId: string) {
  //   return this.postService.getPost(postId);
  // }

  @Get()
  @ApiResponse({ status: 200, type: [PostDto] })
  @ApiOperation({ summary: '게시물 전체 조회' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: '제목 or 내용 검색',
  })
  getPosts(@Query('search') search?: string) {
    return this.postService.getPosts(search);
  }

  @Post()
  @ApiResponse({ status: 201, type: CreatePostResponseDto })
  @ApiOperation({ summary: '게시물 생성' })
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
