import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayloadWithDate } from 'src/@types/auth';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // MEMO: canActivate: jwt validation을 하기 전에 검증
  // MEMO: handleRequest: jwt validation을 한 후에 검증
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
}
