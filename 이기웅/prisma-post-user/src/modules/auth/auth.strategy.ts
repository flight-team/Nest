import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // TODO: authService에서 validate 구현
  // MEMO: 이것이 passport 전략에서의 verify 콜백을 구현하는 것이라고 생각하면 되겠다.
  async validate(name: string, password: string) {
    const user = await this.authService.validateUser(name, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
