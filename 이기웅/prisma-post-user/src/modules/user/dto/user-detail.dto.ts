import { RoleDto } from '@/modules/role/dto/role.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';

export type UserDetailDtoArgs = User & {
  role: RoleDto;
};

export class UserDetailDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  password: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date;

  @ApiProperty({ type: 'string' })
  role: string;

  constructor(args: UserDetailDtoArgs) {
    this.id = args.id;
    this.name = args.name;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
    this.role = args.role.name;
  }
}
