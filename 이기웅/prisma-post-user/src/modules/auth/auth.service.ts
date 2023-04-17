import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDetailDto } from '../user/dto/user-detail.dto';
import { UserService } from '../user/user.service';

import { JwtPayload, JwtPayloadWithDate } from 'src/@types/auth';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RefreshBodyDto } from './dto/refresh-body.dto';
import { TokenExpiredError } from 'jsonwebtoken';
import { RegisterBodyDto } from './dto/register-body.dto';
import * as bcrypt from 'bcrypt';

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

  private signToken(payload: JwtPayload | JwtPayloadWithDate): AuthResponseDto {
    const { name, id, role } = payload;

    return {
      accessToken: this.jwtService.sign(
        { name, id, role },
        {
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRES_IN',
          ),
        },
      ),
      refreshToken: this.jwtService.sign(
        { name, id, role },
        {
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRES_IN',
          ),
        },
      ),
    };
  }

  private async verifyToken(token: string): Promise<JwtPayloadWithDate> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayloadWithDate>(
        token,
        {
          ignoreExpiration: false,
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );

      if (!payload) throw new UnauthorizedException('Invalid Token');

      return payload;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh Token expired');
      }
      throw new UnauthorizedException('Invalid Token');
    }
  }

  login(userDetail: UserDetailDto): AuthResponseDto {
    const { name, id, role } = userDetail;
    return this.signToken({ name, id, role });
  }

  async register(registerBodyDto: RegisterBodyDto) {
    return await this.userService.createUser(registerBodyDto);
  }

  async refresh(dto: RefreshBodyDto): Promise<AuthResponseDto> {
    if (!dto.refreshToken) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }

    const payload = await this.verifyToken(dto.refreshToken);

    return this.signToken(payload);
  }
}
