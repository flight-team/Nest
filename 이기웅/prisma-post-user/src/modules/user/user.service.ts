import { PrismaService } from '@/database/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkNameDuplicated(
    name: string,
    updateUserId?: string,
  ): Promise<boolean> {
    const foundUserUsingName = await this.prisma.user.findFirst({
      where: { name, NOT: { id: updateUserId } },
    });

    if (foundUserUsingName)
      throw new BadRequestException('이미 존재하는 이름입니다.');

    return false;
  }

  async getUser(id: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!foundUser)
      throw new NotFoundException(
        `${id}에 해당하는 사용자가 존재하지 않습니다`,
      );

    return new UserDto(foundUser);
  }

  async getUsers(searchName?: string) {
    const users = await this.prisma.user.findMany({
      where: {
        name: {
          contains: searchName,
        },
      },
    });

    return users.map((user) => new UserDto(user));
  }

  async createUser(createUserDto: CreateUserDto) {
    await this.checkNameDuplicated(createUserDto.name);

    const createdUser = await this.prisma.user.create({ data: createUserDto });
    return { id: createdUser.id };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.getUser(id);
    await this.checkNameDuplicated(updateUserDto.name, id);

    await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async deleteUser(id: string) {
    await this.getUser(id);

    await this.prisma.user.delete({ where: { id } });
  }
}
