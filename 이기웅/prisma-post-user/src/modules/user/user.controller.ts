import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiResponse({ status: 200, type: UserDto })
  @ApiOperation({ summary: 'userId로 사용자 조회' })
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Get()
  @ApiOperation({ summary: '사용자 전체 조회' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @ApiQuery({
    name: 'search',
    required: false,
    description: '검색할 이름',
  })
  async getUsers(@Query('search') search?: string) {
    return await this.userService.getUsers(search);
  }

  @Post()
  @ApiOperation({ summary: '사용자 생성' })
  @ApiResponse({ status: 201, type: CreateUserResponseDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'userId로 사용자 수정' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'userId로 사용자 삭제' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
