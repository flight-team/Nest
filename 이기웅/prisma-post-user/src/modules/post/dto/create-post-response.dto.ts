import { ApiProperty } from '@nestjs/swagger';

export class CreatePostResponseDto {
  @ApiProperty({ type: 'string' })
  id: string;
}
