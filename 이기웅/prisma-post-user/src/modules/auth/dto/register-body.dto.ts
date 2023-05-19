import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterBodyDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  password: string;
}
