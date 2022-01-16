import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(24)
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 lower-case, 1 upper-case, 1 special character, and 1 number!',
  })
  password: string;
}
