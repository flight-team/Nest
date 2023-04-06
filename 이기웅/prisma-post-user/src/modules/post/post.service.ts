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

    if (foundPostUsingTitle)
      throw new BadRequestException('이미 존재하는 제목입니다.');

    return false;
  }

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

  // NOTE: 다른 방식 어떻게 사용하면 되는지?
  async getPosts(title?: string, content?: string, userId?: string) {
    if (userId) this.userService.getUser(userId);

    const posts = await this.prisma.post.findMany({
      where: {
        ...(!!title && {
          title: {
            contains: title,
          },
        }),
        ...(!!content && {
          content: {
            contains: content,
          },
        }),
        ...(userId && { userId }),
      },
      include: {
        User: true,
      },
    });

    return posts.map((post) => new PostDto(post));
  }

  async createPost(createPostDto: CreatePostDto) {
    await this.userService.getUser(createPostDto.userId);
    await this.checkTitleDuplicated(createPostDto.title);

    const createdPost = await this.prisma.post.create({
      data: createPostDto,
    });

    return { id: createdPost.id };
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    await this.getPost(id);
    await this.checkTitleDuplicated(updatePostDto.title, id);

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
