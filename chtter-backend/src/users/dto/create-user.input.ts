import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  // @IsStrongPassword()
  @Min(6)
  password: string;
}
