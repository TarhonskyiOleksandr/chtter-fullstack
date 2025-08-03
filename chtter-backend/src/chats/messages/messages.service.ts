import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';

import { CreateMessageInput } from './dto/create-message.input';
import { ChatsRepository } from '../chats.repository';
import { Message } from './entities/message.entity';
import { GetMessagesArgs } from './dto/get-messages.args';
import { PUB_SUB } from 'src/common/injection-tokens';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { ChatsService } from '../chats.service';
import { MessageCreatedArgs } from './dto/message-created.args';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly chatsService: ChatsService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    const message: Message = {
      _id: new Types.ObjectId(),
      userId,
      chatId,
      content,
      createdAt: new Date(),
    };

    await this.chatsRepository.findOneAndUpdate(
      {
        _id: chatId,
        ...this.chatsService.currentUserChatFilter(userId),
      },
      {
        $set: { lastMessageAt: new Date() },
        $push: {
          messages: message,
        },
      },
    );

    await this.pubSub.publish(MESSAGE_CREATED, { messageCreated: message });

    return message;
  }

  async getMessages({ chatId }: GetMessagesArgs, userId: string) {
    const chat = await this.chatsRepository.findOne({
      _id: chatId,
      ...this.chatsService.currentUserChatFilter(userId),
    });

    return chat.messages.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }

  async messageCreated({ chatId }: MessageCreatedArgs, userId: string) {
    await this.chatsRepository.findOne({
      _id: chatId,
      ...this.chatsService.currentUserChatFilter(userId),
    });
    return this.pubSub.asyncIterableIterator(MESSAGE_CREATED);
  }
}
