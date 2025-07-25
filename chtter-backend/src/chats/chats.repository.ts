import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

import { AbstractRepository } from 'src/common/database/abstract.repository';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsRepository extends AbstractRepository<Chat> {
  protected readonly logger = new Logger(ChatsRepository.name);

  constructor(@InjectModel(Chat.name) chatModel: Model<Chat>) {
    super(chatModel);
  }
}
