import { ApiProperty } from '@nestjs/swagger';
import { Post as PrismaPost } from '@prisma/client';
import { IsDate, IsString } from 'class-validator';

export class Post implements PrismaPost {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  content: string | null;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  userId: string;
}
