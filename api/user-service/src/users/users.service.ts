import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from '../core/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    const userWithoutPassword = { ...existingUser.toObject() };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    if (updateUserDto.password) {
      const hashedPassword = await hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    const updateUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    const userWithoutPassword = { ...updateUser.toObject() };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async delete(id: string) {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    return this.userModel.findByIdAndDelete(id);
  }
}
