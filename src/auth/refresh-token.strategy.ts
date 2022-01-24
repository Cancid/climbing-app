import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload) {
    const { username } = payload;
    const refreshToken = request.cookies?.Refresh;
    return this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      username,
    );
  }
}
