import { UserDetailDto } from '@/modules/user/dto/user-detail.dto';
import { UserDto } from '@/modules/user/dto/user.dto';

declare module 'express' {
  interface Request {
    user?: UserDetailDto;
    loginedUser?: UserDto;
  }
}
