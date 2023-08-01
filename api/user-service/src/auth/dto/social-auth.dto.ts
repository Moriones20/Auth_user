import { IsEmail, IsNotEmpty } from 'class-validator';

export class SocialAuthDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  provider: 'google' | 'facebook';
}
