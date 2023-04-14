import { UserDetailDto } from '@/modules/user/dto/user-detail.dto';

declare module 'express' {
  interface Request {
    user?: UserDetailDto;
  }
}
