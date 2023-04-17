import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

import { ResponseWithIdDto } from '@/common/dto';
import { LocalAuthGuard } from '@/common/guards';
import { ResponseWithIdInterceptor } from '@/common/interceptors';
import { Request } from 'express';
import { AuthBodyDto } from './dto/auth-body.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RefreshBodyDto } from './dto/refresh-body.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  login(@Req() req: Request, @Body() dto: AuthBodyDto) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, type: ResponseWithIdDto })
  @UseInterceptors(ResponseWithIdInterceptor)
  async register(@Body() registerBodyDto: AuthBodyDto) {
    return await this.authService.register(registerBodyDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: '토큰 재발급' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async refresh(@Body() dto: RefreshBodyDto) {
    return await this.authService.refresh(dto);
  }
}
