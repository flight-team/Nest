import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  private async checkTitleDuplicated(
    title: string,
    updatePostId?: string,
  ): Promise<boolean> {
    const foundPostUsingTitle = await this.prisma.post.findFirst({
      where: { title, NOT: { id: updatePostId } },
    });

    if (foundPostUsingTitle) return true;
    return false;
  }

  async getPost(id: string) {
    const post = await this.prisma.post.findFirst({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!post)
      throw new NotFoundException(
        `${id}에 해당하는 게시물이 존재하지 않습니다.`,
      );

    return new PostDto(post);
  }

  async getPosts(searchKey?: string, userId?: string) {
    if (userId) await this.userService.getUser(userId);

    const posts = await this.prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchKey,
            },
          },
          {
            content: {
              contains: searchKey,
            },
          },
        ],
      },
      include: { user: true },
    });

    return posts.map((post) => new PostDto(post));
  }

  async createPost(createPostDto: CreatePostDto) {
    await this.userService.getUser(createPostDto.userId);
    const isDuplicated = await this.checkTitleDuplicated(createPostDto.title);
    if (isDuplicated) throw new BadRequestException('이미 존재하는 제목입니다');

    const createdPost = await this.prisma.post.create({
      data: createPostDto,
    });

    return { id: createdPost.id };
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    await this.getPost(id);
    const isDuplicated = await this.checkTitleDuplicated(
      updatePostDto.title,
      id,
    );
    if (isDuplicated) throw new BadRequestException('이미 존재하는 제목입니다');

    if (updatePostDto?.userId) {
      await this.userService.getUser(updatePostDto.userId);
    }

    await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async deletePost(id: string) {
    await this.getPost(id);

    await this.prisma.post.delete({
      where: { id },
    });
  }
}
