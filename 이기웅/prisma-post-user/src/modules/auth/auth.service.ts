import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDetailDto } from '../user/dto/user-detail.dto';
import { UserService } from '../user/user.service';
import { AuthBodyDto } from './dto/auth-body.dto';

// TODO: bcrypt도 해야하고...
// TODO: db도 갈아야하냐?

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<UserDetailDto> {
    const user = await this.userService.getUserForAuth(name, password);
    if (!user) return null;
    return user;
  }

  async login(userDetail: UserDetailDto) {
    const { name, id, role } = userDetail;
    const payload = { name, id, role };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerBodyDto: AuthBodyDto) {
    return await this.userService.createUser(registerBodyDto);
  }
}
