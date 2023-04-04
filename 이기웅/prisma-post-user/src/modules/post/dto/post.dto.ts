import { Post, User } from '@prisma/client';
import { UserDto } from '@/modules/user/dto/user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type PostDtoArgs = Exclude<Post, 'User'> & {
  User: User;
};

export class PostDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiPropertyOptional({ type: 'string', nullable: true })
  content: string | null;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: UserDto })
  user: UserDto;

  constructor(args: PostDtoArgs) {
    this.id = args.id;
    this.title = args.title;
    this.content = args.content;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.user = new UserDto(args.User);
  }
}
