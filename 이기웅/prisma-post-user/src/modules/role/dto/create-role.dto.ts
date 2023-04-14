import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;
}
