import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/@types/auth';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: new ConfigService().get('JWT_SECRET'),
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    if (
      !req.get('authorization') ||
      !req.get('authorization').split('Bearer ')[1]
    ) {
      throw new UnauthorizedException('Refresh Token is not provided');
    }

    const refreshToken = req.get('authorization').split('Bearer ')[1];

    return {
      ...payload,
      refreshToken,
    };
  }
}
