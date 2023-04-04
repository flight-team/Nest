import { PrismaService } from '@/database/prisma.service';
import {
  BadRequestException,
  Get,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

function exclude(user: User, keys: (keyof User)[]): UserDto {
  for (const key of keys) {
    delete user[key];
  }

  return new UserDto(user);
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkNameDuplicated(name: string): Promise<UserDto> {
    const foundUserUsingName = await this.prisma.user.findFirst({
      where: { name },
    });

    if (foundUserUsingName)
      throw new BadRequestException('이미 존재하는 이름입니다.');

    return exclude(foundUserUsingName, ['password']);
  }

  async getUser(id: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!foundUser)
      throw new NotFoundException(
        `${id}에 해당하는 사용자가 존재하지 않습니다`,
      );

    return exclude(foundUser, ['password']);
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => exclude(user, ['password']));
  }

  async createUser(createUserDto: CreateUserDto) {
    this.checkNameDuplicated(createUserDto.name);

    const createdUser = await this.prisma.user.create({ data: createUserDto });
    return { id: createdUser.id };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    this.getUser(id);

    await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async deleteUser(id: string) {
    this.getUser(id);

    await this.prisma.user.delete({ where: { id } });
  }
}
