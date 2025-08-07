import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateChatInput {
  @Field()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name: string;
}
