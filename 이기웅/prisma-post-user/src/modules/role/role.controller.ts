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
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@Controller('admin/roles')
@ApiTags('[ADMIN] Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':id')
  @ApiOperation({ summary: '권한 조회' })
  @ApiResponseDto(RoleDto)
  @UseInterceptors(ResponseInterceptor)
  findOne(@Param('id') id: string) {
    return this.roleService.getRole(id);
  }

  @Get()
  @ApiOperation({ summary: '권한 전체 조회' })
  @ApiResponseArrayDto(RoleDto)
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

  @Patch(':id')
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
  @Delete(':id')
  @ApiOperation({ summary: '권한 삭제' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async deleteRole(@Param('id') id: string) {
    return await this.roleService.deleteRole(id);
  }
}
