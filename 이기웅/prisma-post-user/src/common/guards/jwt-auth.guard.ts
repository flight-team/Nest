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
import { Observable } from 'rxjs';
import { JwtPayloadWithDate } from 'src/@types/auth';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!Array.isArray(roles) || roles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedException();

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    const userRole = decoded.role;
    const canActivate = roles.includes(userRole);
    if (!canActivate)
      throw new ForbiddenException('접근할 수 없는 권한입니다.');

    return canActivate;
  }
}
