import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { verify } from 'argon2';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import { handleMongoError } from 'src/common/helpers';
import { S3Service } from 'src/common/s3/s3.service';
import { USERS_BUCKET } from './users.constants';

@Injectable()
export class UsersService {
  constructor(
    private readonly users: UsersRepository,
    private readonly s3Sevice: S3Service,
  ) {}

  private async hashPassword(password: string) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  async create(createUserInput: CreateUserInput) {
    try {
      const hashedPassword = await this.hashPassword(createUserInput.password);

      return await this.users.create({
        ...createUserInput,
        password: hashedPassword,
      });
    } catch (err: any) {
      throw handleMongoError(err);
    }
  }

  async findAll() {
    return await this.users.find({});
  }

  async findOne(_id: string) {
    return this.users.findOne({ _id });
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    return this.users.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...updateUserInput,
          ...(updateUserInput.password
            ? { password: await this.hashPassword(updateUserInput.password) }
            : {}),
        },
      },
    );
  }

  async remove(_id: string) {
    return this.users.findOneAndDelete({ _id });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.users.findOne({ email });
    const isPasswordMatch = await verify(user.password, password);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async uploadAvatar(file: Buffer, userId: string) {
    await this.s3Sevice.upload({
      bucket: USERS_BUCKET,
      key: `${userId}.jpg`,
      file,
    });
  }
}
