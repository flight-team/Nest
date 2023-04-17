import {
  ResponseInterceptor,
  ResponseWithIdInterceptor,
  Roles,
} from '@/common/interceptors';
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

import {
  ApiResponseArrayDto,
  ApiResponseDto,
  ResponseWithIdDto,
} from '@/common/dto';
import { JwtAuthGuard } from '@/common/guards';
import { ROLE } from 'src/utils/constants';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiResponseDto(UserDto)
  @ApiOperation({ summary: 'userId로 사용자 조회' })
  @UseInterceptors(ResponseInterceptor)
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Get()
  @ApiOperation({ summary: '사용자 전체 조회' })
  @ApiResponseArrayDto(UserDto)
  @UseInterceptors(ResponseInterceptor)
  async getUsers(@Query() query: GetUsersQueryDto) {
    return await this.userService.getUsers({
      where: {
        name: {
          contains: query.name,
        },
      },
    });
  }

  @Post()
  @ApiOperation({ summary: '사용자 생성' })
  @ApiResponse({ status: 201, type: ResponseWithIdDto })
  @UseInterceptors(ResponseWithIdInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Roles(ROLE.ADMIN)
  @HttpCode(201)
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
