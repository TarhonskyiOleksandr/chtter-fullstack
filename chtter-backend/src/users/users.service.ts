import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { verify } from 'argon2';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import { handleMongoError } from 'src/common/helpers';
import { S3Service } from 'src/common/s3/s3.service';
import { USERS_BUCKET } from './users.constants';
import { UserDocument } from './entities/user.document';
import { User } from './entities/user.entity';

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
      const userDocument = await this.users.create({
        ...createUserInput,
        password: hashedPassword,
      });

      return this.transformToEntity(userDocument);
    } catch (err: any) {
      throw handleMongoError(err);
    }
  }

  async findAll() {
    return (await this.users.find({})).map((user) =>
      this.transformToEntity(user),
    );
  }

  async findOne(_id: string) {
    const user = await this.users.findOne({ _id });
    return this.transformToEntity(user);
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    const updatedUser = await this.users.findOneAndUpdate(
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

    return this.transformToEntity(updatedUser);
  }

  async remove(_id: string) {
    const deletedUser = await this.users.findOneAndDelete({ _id });

    return this.transformToEntity(deletedUser);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.users.findOne({ email });
    const isPasswordMatch = await verify(user.password, password);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return this.transformToEntity(user);
  }

  async uploadAvatar(file: Buffer, userId: string) {
    await this.s3Sevice.upload({
      bucket: USERS_BUCKET,
      key: this.getUserAvatar(userId),
      file,
    });
  }

  transformToEntity(userDocument: UserDocument): User {
    const avatar = this.s3Sevice.getObjectUrl(
      USERS_BUCKET,
      this.getUserAvatar(userDocument._id.toHexString()),
    );
    const user = {
      ...userDocument,
      avatar,
    };
    delete user.password;

    return user;
  }

  getUserAvatar(userId: string) {
    return `${userId}.jpg`;
  }
}
