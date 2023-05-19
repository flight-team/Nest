import { UserService } from '@/modules/user/user.service';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JwtPayloadWithDate } from 'src/@types/auth';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super();
  }

  handleRequest<Payload extends JwtPayloadWithDate>(
    err: any,
    payload: Payload,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): Payload {
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Token Expired');
    }

    if (!!err || !payload) {
      throw err || new UnauthorizedException();
    }

    return payload;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!Array.isArray(roles) || roles.length === 0) return true;

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      if (!authHeader) throw new UnauthorizedException();

      const token = authHeader.split(' ')[1];

      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const userRole = decoded.role;
      const canActivate = roles.includes(userRole);

      if (!canActivate) {
        throw new ForbiddenException('접근할 수 없는 권한입니다.');
      }

      const user = await this.userService.getUser(decoded.id);
      req.user = user;

      return true;
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid Token');
      }
      throw e;
    }
  }
}
