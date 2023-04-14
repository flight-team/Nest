import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterBodyDto } from './dto/register-body.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: '로그인' })
  async login() {}

  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  async register(@Body() registerBodyDto: RegisterBodyDto) {}
}
