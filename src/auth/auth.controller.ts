/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import JwtRefreshGuard from './refresh-token.guards';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  asignUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @UseGuards(LocalAuthGuard)
  @Get('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto, @Res() response: Response): Promise<void> {
    return this.authService.signIn(authCredentialsDto, response);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  refresh(@GetUser() user: User) {
    return this.authService.getAccessToken(user.username);
  }

  // @Post('/singout')
  // async signout(@Body() authCredentialsDto: AuthCredentialsDto)
}
