import {
  ApiResponseArrayDto,
  ApiResponseDto,
  ResponseWithIdDto,
} from '@/common/dto';
import {
  ResponseInterceptor,
  ResponseWithIdInterceptor,
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/roles')
@ApiTags('[ADMIN] Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':name')
  @ApiOperation({ summary: '권한 조회' })
  @ApiResponseDto(RoleDto)
  @UseInterceptors(ResponseInterceptor)
  findOne(@Param('name') name: string) {
    return this.roleService.getRole(name);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '권한 전체 조회' })
  @ApiResponseArrayDto(RoleDto)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(ResponseInterceptor)
  async getRoles() {
    return await this.roleService.getRoles();
  }

  @Post()
  @ApiOperation({ summary: '권한 생성' })
  @ApiResponse({ status: 201, type: ResponseWithIdDto })
  @UseInterceptors(ResponseWithIdInterceptor)
  @HttpCode(201)
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Patch(':name')
  @ApiOperation({ summary: '권한 수정' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  // TODO: soft delete
  @Delete(':name')
  @ApiOperation({ summary: '권한 삭제' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async deleteRole(@Param('id') id: string) {
    return await this.roleService.deleteRole(id);
  }
}
