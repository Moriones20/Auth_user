import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const plainToHash = await hash(password, 10);
    registerAuthDto = { ...registerAuthDto, password: plainToHash };
    return this.userModel.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);

    const payload = { id: findUser._id, name: findUser.name };
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };

    return data;
  }

  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from Google';
    }
    return {
      message: 'User info from Google',
      user: req.user,
    };
  }
}
