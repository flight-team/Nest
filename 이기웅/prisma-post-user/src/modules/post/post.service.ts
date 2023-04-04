import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getPost() {}

  async getPosts(search?: string) {
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

    return posts.map((post) => new PostDto(post));
  }

  async createPost(createPostDto: CreatePostDto) {
    await this.userService.getUser(createPostDto.userId);
    // NOTE: 토큰이 없으니... userId를 받아야겠지..?
    // NOTE: content의 경우 nullable인데, 키값을 아예 안넣는 경우에도 처리되게 하는 커스텀 방법이 있나

    const createdPost = await this.prisma.post.create({
      data: createPostDto,
    });

    return { id: createdPost.id };
  }
}
