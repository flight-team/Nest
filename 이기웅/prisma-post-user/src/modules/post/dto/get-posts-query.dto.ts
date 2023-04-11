import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class GetPostsQueryDto {
  @ApiPropertyOptional({ description: '제목' })
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: '내용' })
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: '사용자 ID' })
  @IsOptional()
  @IsString()
  userId: string;
}
