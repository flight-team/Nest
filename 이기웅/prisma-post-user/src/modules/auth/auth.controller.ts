import { Bind, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterBodyDto } from './dto/register-body.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // 'local' => passport의 전략 이름
  // 현재는 전략이 local 하나이지만, 전략이 추가될 것이기 때문에 명확성 기재를 위해
  @UseGuards(AuthGuard('local'))
  @Bind(Req())
  @ApiOperation({ summary: '로그인' })
  async login(req) {
    return req.user;
  }

  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  async register(@Body() registerBodyDto: RegisterBodyDto) {}
}
