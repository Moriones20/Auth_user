import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const { name, email, password } = registerAuthDto;

    if (!name || !email || !password) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findUser = await this.userModel.findOne({ email });
    if (findUser) {
      throw new HttpException('User already registered', HttpStatus.CONFLICT);
    }

    const plainToHash = await hash(password, 10);
    const userRegistered = await this.userModel.create({
      name,
      email,
      password: plainToHash,
    });

    const userWithoutPassword = { ...userRegistered.toObject() };
    delete userWithoutPassword.password;

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Registration successful',
      user: userWithoutPassword,
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) throw new HttpException('User not found', 404);

    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) throw new HttpException('Password invalid', 403);

    const userWithoutPassword = { ...findUser.toObject() };
    delete userWithoutPassword.password;

    const payload = { id: findUser._id.toString(), name: findUser.name };

    const token = this.jwtService.sign(payload);

    const data = {
      user: userWithoutPassword,
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

      return { token, user: existingUser };
    }

    const newUser = new this.userModel({
      email,
      name,
      provider,
    });

    await newUser.save();

    const payload = { id: newUser._id.toString(), name: newUser.name };
    const token = this.jwtService.sign(payload);

    return { token, user: newUser };
  }

  verifyJWT() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Valid token',
    };
  }
}
