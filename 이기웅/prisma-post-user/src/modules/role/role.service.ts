import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '@/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkNameDuplicated(name: string): Promise<boolean> {
    const role = await this.prisma.role.findFirst({
      where: {
        name,
      },
    });

    return !!role;
  }

  async create(createRoleDto: CreateRoleDto) {
    const isDuplicated = await this.checkNameDuplicated(createRoleDto.name);
    if (isDuplicated) {
      throw new BadRequestException(
        `${createRoleDto.name} 는 이미 존재하는 권한입니다.`,
      );
    }

    const createdRole = await this.prisma.role.create({
      data: createRoleDto,
    });

    return createdRole.id;
  }

  async getRoles(args = {} as Prisma.RoleFindManyArgs) {
    return await this.prisma.role.findMany(args);
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
