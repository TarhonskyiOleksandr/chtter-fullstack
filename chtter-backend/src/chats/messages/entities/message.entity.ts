import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractEntity } from 'src/common/database/abstract.entity';

@ObjectType()
@Schema()
export class Message extends AbstractEntity {
  @Field()
  @Prop()
  content: string;

  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  chatId: string;

  @Field()
  @Prop()
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
