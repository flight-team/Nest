import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JWT_EXPIRATION_TIME, JWT_SECRET } from '@/common/constants/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    UserModule,
    JwtModule.register({
      // FIXME: JWT_SECRET 을 env에 어떻게 넣죠?
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
