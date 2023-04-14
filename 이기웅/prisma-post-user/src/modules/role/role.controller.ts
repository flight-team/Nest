import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiResponseArrayDto,
  ApiResponseDto,
  ResponseArrayDto,
  ResponseWithIdDto,
} from '@/common/dto';
import {
  ResponseInterceptor,
  ResponseWithIdInterceptor,
} from '@/common/interceptors';
import { RoleDto } from './dto/role.dto';

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
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
