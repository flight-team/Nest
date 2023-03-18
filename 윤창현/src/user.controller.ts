import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number): User {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: User): User {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: User): User {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): User {
    return this.userService.deleteUser(id);
  }
}
