import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Get('/signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    const accessToken = await this.authService.signIn(authCredentialsDto);
    return { accessToken };
  }

  @Get('/refresh')
  refresh(@Body() AuthCredentialsDto: AuthCredentialsDto) {
    return this.authService.getAccessToken(AuthCredentialsDto);
  }

  // @Post('/singout')
  // async signout(@Body() authCredentialsDto: AuthCredentialsDto)
}
