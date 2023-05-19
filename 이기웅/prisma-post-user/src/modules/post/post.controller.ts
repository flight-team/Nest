import {
  ApiResponseArrayDto,
  ApiResponseDto,
  ResponseWithIdDto,
} from '@/common/dto';
import {
  ResponseInterceptor,
  ResponseWithIdInterceptor,
  Roles,
} from '@/common/interceptors';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsQueryDto } from './dto/get-posts-query.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { ACCESS_TOKEN } from 'src/utils/constants/jwt.constant';
import { JwtAuthGuard } from '@/common/guards';
import { ROLE } from 'src/utils/constants';
import { User } from '@/common/decorators';
import { UserDto } from '../user/dto/user.dto';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Get(':id')
  @ApiResponseDto(PostDto)
  @ApiOperation({ summary: 'postId로 게시물 조회' })
  @UseInterceptors(ResponseInterceptor)
  async getPost(@Param('id') id: string) {
    return await this.postService.getPost(id);
  }

  @Get()
  @ApiResponseArrayDto(PostDto)
  @ApiOperation({ summary: '게시물 전체 조회' })
  @UseInterceptors(ResponseInterceptor)
  async getPosts(@Query() query: GetPostsQueryDto) {
    if (query.userId) await this.userService.getUser(query.userId);

    return await this.postService.getPosts({
      where: {
        title: {
          contains: query.title,
        },
        content: {
          contains: query.content,
        },
        userId: {
          contains: query.userId,
        },
      },
    });
  }

  @Post()
  @ApiResponse({ status: 201, type: ResponseWithIdDto })
  @ApiOperation({ summary: '게시물 생성' })
  @UseInterceptors(ResponseWithIdInterceptor)
  @HttpCode(201)
  @ApiBearerAuth(ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @User() user: UserDto,
  ) {
    return await this.postService.createPost(createPostDto, user.id);
  }

  @Patch(':id')
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'postId로 게시물 수정' })
  @HttpCode(204)
  @ApiBearerAuth(ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @User() user: UserDto,
  ) {
    if (user.role !== ROLE.ADMIN && id !== user.id) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return await this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'postId로 게시물 삭제' })
  @HttpCode(204)
  @ApiBearerAuth(ACCESS_TOKEN)
  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  async deletePost(@Param('id') id: string, @User() user: UserDto) {
    if (user.role !== ROLE.ADMIN && id !== user.id) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return await this.postService.deletePost(id);
  }
}
