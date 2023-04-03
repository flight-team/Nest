import { ApiProperty } from '@nestjs/swagger';
import {} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}
