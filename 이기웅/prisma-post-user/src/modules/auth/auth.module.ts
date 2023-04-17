import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    UserModule,
    JwtModule.register({
      secret: new ConfigService().get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: new ConfigService().get<string>('JWT_EXPIRES_IN'),
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
