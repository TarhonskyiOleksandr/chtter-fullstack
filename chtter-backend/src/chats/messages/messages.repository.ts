import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

import { AbstractRepository } from 'src/common/database/abstract.repository';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesRepository extends AbstractRepository<Message> {
  protected readonly logger = new Logger(MessagesRepository.name);

  constructor(@InjectModel(Message.name) chatModel: Model<Message>) {
    super(chatModel);
  }
}
