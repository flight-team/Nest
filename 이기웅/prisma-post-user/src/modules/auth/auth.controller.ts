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

import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthBodyDto } from './dto/auth-body.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ResponseWithIdInterceptor } from '@/common/interceptors';
import { ApiResponseDto, ResponseWithIdDto } from '@/common/dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async login(@Req() req: Request, @Body() dto: AuthBodyDto) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, type: ResponseWithIdDto })
  @UseInterceptors(ResponseWithIdInterceptor)
  async register(@Body() registerBodyDto: AuthBodyDto) {
    return await this.authService.register(registerBodyDto);
  }
}
