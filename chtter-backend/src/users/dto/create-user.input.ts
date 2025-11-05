import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  // @IsStrongPassword()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  avatar?: string;
}
