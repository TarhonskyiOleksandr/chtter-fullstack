import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { CreateMessageInput } from './dto/create-message.input';
import { ChatsRepository } from '../chats.repository';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    const message: Message = {
      _id: new Types.ObjectId(),
      userId,
      content,
      createdAt: new Date(),
    };

    await this.chatsRepository.findOneAndUpdate(
      {
        _id: chatId,
        $or: [
          { userId },
          {
            userIds: {
              $in: [userId],
            },
          },
        ],
      },
      {
        $push: {
          messages: message,
        },
      },
    );

    return message;
  }
}
