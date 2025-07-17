import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateChatInput {
  @Field()
  @IsBoolean()
  isPrivate: boolean;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  userIds?: string[];

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name: string;
}
