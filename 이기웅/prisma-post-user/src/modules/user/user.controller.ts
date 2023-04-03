import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: [User], isArray: true })
  getUsers() {
    return this.userService.getUsers();
  }
}
