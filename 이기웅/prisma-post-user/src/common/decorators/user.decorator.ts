import { UserDto } from '@/modules/user/dto/user.dto';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator<unknown, ExecutionContext, UserDto>(
  (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
