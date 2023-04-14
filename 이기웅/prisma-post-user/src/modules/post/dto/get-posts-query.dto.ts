import { toLowerCase } from '@/common/helper/cast.helper';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class GetPostsQueryDto {
  @ApiPropertyOptional({ description: '제목' })
  @Transform(({ value }) => toLowerCase(value))
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: '내용' })
  @Transform(({ value }) => toLowerCase(value))
  @IsOptional()
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: '사용자 ID' })
  @IsOptional()
  @IsString()
  userId: string;
}
