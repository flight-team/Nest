import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshBodyDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
