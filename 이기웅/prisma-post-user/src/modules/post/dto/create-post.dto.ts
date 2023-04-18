import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ type: 'string' })
  content?: string;
}
