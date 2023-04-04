import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getPost(id: string) {
    const post = await this.prisma.post.findFirst({
      where: { id },
      include: {
        User: true,
      },
    });

    if (!post)
      throw new NotFoundException(
        `${id}에 해당하는 게시물이 존재하지 않습니다.`,
      );

    return new PostDto(post);
  }

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

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    this.getPost(id);

    if (updatePostDto?.userId) {
      await this.userService.getUser(updatePostDto.userId);
    }

    await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async deletePost(id: string) {
    this.getPost(id);

    await this.prisma.post.delete({
      where: { id },
    });
  }
}
