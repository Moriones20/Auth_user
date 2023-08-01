import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { SocialAuthDto } from './dto/social-auth.dto';

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

    const payload = { id: findUser._id.toString(), name: findUser.name };
    console.log(process.env.SECRET_SEED);

    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };

    return data;
  }

  async registerSocial(SocialAuthDto: SocialAuthDto) {
    const { email, name, provider } = SocialAuthDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      const payload = {
        id: existingUser._id.toString(),
        name: existingUser.name,
      };
      const token = this.jwtService.sign(payload);

      return { user: SocialAuthDto, token };
    }

    const newUser = new this.userModel({
      email,
      name,
      provider,
    });

    await newUser.save();

    const payload = { id: newUser._id.toString(), name: newUser.name };
    const token = this.jwtService.sign(payload);

    return { user: newUser, token };
  }
}
