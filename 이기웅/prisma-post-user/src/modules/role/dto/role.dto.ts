import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ type: 'string' })
  name: string;

  constructor(args: RoleDto) {
    Object.assign(this, args);
  }
}
