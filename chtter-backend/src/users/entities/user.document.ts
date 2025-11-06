import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractEntity } from 'src/common/database/abstract.entity';

@Schema({ versionKey: false })
export class UserDocument extends AbstractEntity {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
