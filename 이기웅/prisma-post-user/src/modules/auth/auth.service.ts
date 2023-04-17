import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDetailDto } from '../user/dto/user-detail.dto';
import { UserService } from '../user/user.service';
import { AuthBodyDto } from './dto/auth-body.dto';
import { JwtPayload } from 'src/@types/auth';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(name: string, password: string): Promise<UserDetailDto> {
    const user = await this.userService.getUserForAuth(name, password);
    if (!user) return null;
    return user;
  }

  login(userDetail: UserDetailDto): AuthResponseDto {
    const { name, id, role } = userDetail;
    const payload: JwtPayload = { name, id, role };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRES_IN',
        ),
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_TOKEN_EXPIRES_IN',
        ),
      }),
    };
  }

  async register(registerBodyDto: AuthBodyDto) {
    return await this.userService.createUser(registerBodyDto);
  }

  async refresh() {}
}
