import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshBodyDto {
  @ApiProperty({ type: 'string', example: 'Bearer {refreshToken}' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
