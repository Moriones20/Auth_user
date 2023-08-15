import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  name?: string;

  @MinLength(6)
  @MaxLength(20)
  password?: string;
}
