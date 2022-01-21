import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { request } from 'http';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Get('/signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    const accessToken = this.authService.signIn(authCredentialsDto);
    const refreshToken = this.authService.getRefreshTokenCookie(authCredentialsDto);
    
  
  }

  // @Post('/singout')
  // async signout(@Body() authCredentialsDto: AuthCredentialsDto)
}
