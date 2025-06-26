import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly users: UsersRepository) {}

  private async hashPassword(password: string) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await this.hashPassword(createUserInput.password);

    return this.users.create({
      ...createUserInput,
      password: hashedPassword,
    });
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
}
