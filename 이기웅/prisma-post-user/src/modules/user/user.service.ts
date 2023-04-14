import { PrismaService } from '@/database/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Prisma } from '@prisma/client';
import { RoleService } from '../role/role.service';
import { UserDetailDto } from './dto/user-detail.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleService: RoleService,
  ) {}

  private async checkNameDuplicated(
    name: string,
    updateUserId?: string,
  ): Promise<boolean> {
    const foundUserUsingName = await this.prisma.user.findFirst({
      where: { name, NOT: { id: updateUserId } },
    });

    if (foundUserUsingName) return true;
    return false;
  }

  async getUser(id: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: { id },
      include: { role: true },
    });

    if (!foundUser)
      throw new NotFoundException(
        `${id}에 해당하는 사용자가 존재하지 않습니다`,
      );

    return new UserDto(foundUser);
  }

  async getUserForAuth(name: string, password: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: { name, password },
      include: { role: true },
    });

    if (!foundUser) throw new NotFoundException('사용자를 찾을 수 없습니다');

    return new UserDetailDto(foundUser);
  }

  async getUsers(args = {} as Prisma.UserFindManyArgs) {
    const users = await this.prisma.user.findMany({
      ...args,
      include: { role: true },
    });
    return users.map((user) => new UserDto(user));
  }

  async createUser(createUserDto: CreateUserDto) {
    await this.roleService.getRole(createUserDto.role);
    const isDuplicated = await this.checkNameDuplicated(createUserDto.name);
    if (isDuplicated) throw new BadRequestException('이미 존재하는 이름입니다');

    const createdUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        password: createUserDto.password,
        role: { connect: { name: createUserDto.role } },
      },
    });
    return createdUser.id;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.getUser(id);
    const isDuplicated = await this.checkNameDuplicated(updateUserDto.name, id);
    if (isDuplicated) throw new BadRequestException('이미 존재하는 이름입니다');

    await this.prisma.user.update({
      data: {
        name: updateUserDto.name,
        password: updateUserDto.password,
        role: { update: { name: updateUserDto.role } },
      },
      where: { id },
    });
  }

  async deleteUser(id: string) {
    await this.getUser(id);

    await this.prisma.user.delete({ where: { id } });
  }
}
