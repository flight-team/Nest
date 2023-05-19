import { UserDetailDto } from '@/modules/user/dto/user-detail.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'name',
      passwordField: 'password',
      passReqToCallback: false,
    });
  }

  // canActivate가 실행되고 나서 실행되는 메서드이며, 반환한 user는 handleRequest가 반환하게 된다.
  async validate(name: string, password: string): Promise<UserDetailDto> {
    const user = await this.authService.validateUser(name, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
