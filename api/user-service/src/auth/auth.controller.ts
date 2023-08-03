import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { SocialAuthDto } from './dto/social-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req: any) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const socialAuth: SocialAuthDto = {
      email: req.user.email,
      name: req.user.name,
      provider: 'google',
    };

    const { token } = await this.authService.registerSocial(socialAuth);
    if (token)
      res.redirect('http://localhost:4200/login/callback/?jwt=' + token);
    else res.redirect('http://localhost:4200/login/failure');
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  async facebookLogin(@Req() req: any) {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: any, @Res() res: any) {
    const socialAuth: SocialAuthDto = {
      email: req.user.email,
      name: req.user.name,
      provider: 'facebook',
    };
    const { token } = await this.authService.registerSocial(socialAuth);
    if (token)
      res.redirect('http://localhost:4200/login/callback/?jwt=' + token);
    else res.redirect('http://localhost:4200/login/failure');
  }
}
