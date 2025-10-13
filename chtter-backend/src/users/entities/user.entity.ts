import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractEntity } from 'src/common/database/abstract.entity';

@ObjectType()
export class User extends AbstractEntity {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  avatar: string;
}
