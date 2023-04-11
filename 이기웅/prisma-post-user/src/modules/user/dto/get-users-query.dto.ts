import { toLowerCase } from '@/common/helper/cast.helper';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class GetUsersQueryDto {
  @ApiPropertyOptional({ description: '사용자 이름' })
  @Transform(({ value }) => toLowerCase(value))
  @IsString()
  @IsOptional()
  name: string;
}
