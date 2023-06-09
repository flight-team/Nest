import { RoleDto } from '@/modules/role/dto/role.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';

export type UserDtoArgs = User & {
  role: RoleDto;
};

export class UserDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date;

  @ApiProperty({ type: 'string' })
  role: string;

  constructor(args: UserDtoArgs) {
    this.id = args.id;
    this.name = args.name;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
    this.role = args.role.name;
  }
}
