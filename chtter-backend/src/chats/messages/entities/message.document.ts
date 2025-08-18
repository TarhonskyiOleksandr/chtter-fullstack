import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { AbstractEntity } from 'src/common/database/abstract.entity';

@Schema()
export class MessageDocument extends AbstractEntity {
  @Prop()
  content: string;

  @Prop()
  userId: Types.ObjectId;

  @Prop()
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(MessageDocument);
