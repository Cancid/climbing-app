import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ExtractJwt } from 'passport-jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { User } from './user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }
  // canActivate(context: ExecutionContext): boolean {
  //   const request = context.switchToHttp().getRequest();
  //   try {
  //     const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken();
  //     console.log(accessToken);
  //     if (Date.parse(accessToken.iat) > Date.now()) {
  //       const refreshToken = request.cookies.Refresh;
  //       if (
  //         this.authService.getUserByRefreshToken(
  //           refreshToken,
  //           request.user.username,
  //         )
  //       ) {
  //         const accessToken = this.authService.getAccessToken(
  //           request.user.username,
  //         );
  //         console.log(accessToken);
  //         return true;
  //       }
  //       return false;
  //     }
  //   } catch {
  //     return false;
  //   }
  // }

  handleRequest(err, user: any, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies.Refresh;
    console.log(user);
    console.log(request);
    // this.authService.getUserByRefreshToken(refreshToken, user);
    return user;
    //     if (info instanceof TokenExpiredError) {

    //     }
  }
}
