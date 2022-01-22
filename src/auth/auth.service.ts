import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    response: Response,
  ): Promise<void> {
    const { username, email, password } = authCredentialsDto;
    const user =
      (await this.usersRepository.findOne({ username })) ||
      (await this.usersRepository.findOne({ email }));

    if (user && (await bcrypt.compare(password, user.password))) {
      const refreshToken = await this.getRefreshToken(username);
      await this.setRefreshToken(refreshToken.refreshToken, user);
      const accessToken = await this.getAccessToken(username);
      response.setHeader('Set-Cookie', [refreshToken.cookie]);
      response.json(accessToken);
    } else {
      throw new UnauthorizedException(
        'Please check your username and password.',
      );
    }
  }

  async getAccessToken(username: string): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async getRefreshToken(
    username: string,
  ): Promise<{ cookie: string; refreshToken: string }> {
    const payload: JwtPayload = { username };
    const refreshToken = await this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
    });
    const cookie = `Refresh = ${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'REFRESH_TOKEN_EXPIRATION',
    )}`;
    return { cookie, refreshToken };
  }

  async setRefreshToken(refreshToken: string, user: User): Promise<void> {
    console.log(refreshToken);
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(user.id, { currentHashedRefreshToken });
    return;
  }

  async getUserByRefreshToken(
    refreshToken: string,
    username: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ username });
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
