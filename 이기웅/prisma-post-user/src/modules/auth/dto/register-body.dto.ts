import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsString } from 'class-validator';

export class RegisterBodyDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  password: string;
}
