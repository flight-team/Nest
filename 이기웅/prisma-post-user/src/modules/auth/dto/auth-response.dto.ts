import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthResponseDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
