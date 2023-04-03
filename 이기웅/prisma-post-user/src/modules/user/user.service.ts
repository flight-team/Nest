import { PrismaService } from '@/database/prisma.service';
import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getUsers() {
    return this.prisma.user.findMany();
  }
}
