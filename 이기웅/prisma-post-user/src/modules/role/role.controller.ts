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
import { ResponseArrayDto, ResponseWithIdDto } from '@/common/dto';
import { ResponseWithIdInterceptor } from '@/common/interceptors';
import { RoleDto } from './dto/role.dto';

@Controller('admin/roles')
@ApiTags('[ADMIN] Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiResponse({ status: 201, type: ResponseWithIdDto })
  @ApiOperation({ summary: '권한 생성' })
  @UseInterceptors(ResponseWithIdInterceptor)
  @HttpCode(201)
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [RoleDto] })
  @ApiOperation({ summary: '권한 목록 조회' })
  @UseInterceptors(ResponseArrayDto)
  async getRoles() {
    return await this.roleService.getRoles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
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
