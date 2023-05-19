import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '@/database/prisma.service';
import { Prisma } from '@prisma/client';
import { RoleDto } from './dto/role.dto';

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

  async getRole(name: string) {
    const role = await this.prisma.role.findFirst({
      where: {
        name,
      },
    });

    if (!role) {
      throw new NotFoundException(`${name} 에 해당하는 권한이 없습니다.`);
    }

    return new RoleDto(role);
  }

  async getRoles(args = {} as Prisma.RoleFindManyArgs) {
    const roles = await this.prisma.role.findMany(args);
    return roles.map((role) => new RoleDto(role));
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

    return createdRole.name;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    await this.getRole(id);
    const isDuplicated = await this.checkNameDuplicated(updateRoleDto?.name);
    if (isDuplicated) {
      throw new BadRequestException(
        `${updateRoleDto?.name}은 이미 존재하는 권한입니다.`,
      );
    }

    return await this.prisma.role.update({
      data: updateRoleDto,
      where: { name: id },
    });
  }

  async deleteRole(id: string) {
    await this.getRole(id);
    return await this.prisma.role.delete({ where: { name: id } });
  }
}
