import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';

import { CreateMessageInput } from './dto/create-message.input';
import { ChatsRepository } from '../chats.repository';
import { GetMessagesArgs } from './dto/get-messages.args';
import { PUB_SUB } from 'src/common/injection-tokens';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { MessageDocument } from './entities/message.document';
import { Message } from './entities/message.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    const messageDocument: MessageDocument = {
      _id: new Types.ObjectId(),
      userId: new Types.ObjectId(userId),
      content,
      createdAt: new Date(),
    };

    await this.chatsRepository.findOneAndUpdate(
      {
        _id: chatId,
      },
      {
        $set: { lastMessageAt: new Date() },
        $push: {
          messages: messageDocument,
        },
      },
    );

    const user = await this.usersService.findOne(userId);

    const message: Message = {
      ...messageDocument,
      chatId,
      user,
    };

    await this.pubSub.publish(MESSAGE_CREATED, {
      messageCreated: message,
    });

    return message;
  }

  async getMessages({ chatId, offset, limit }: GetMessagesArgs) {
    const messages = await this.chatsRepository.model.aggregate([
      { $match: { _id: new Types.ObjectId(chatId) } },
      { $unwind: '$messages' },
      { $replaceRoot: { newRoot: '$messages' } },
      { $sort: { createdAt: -1 } },
      { $skip: offset ?? 0 },
      { $limit: limit ?? 10 },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      { $unset: 'userId' },
      { $set: { chatId } },
    ]);

    return messages.map((message) => ({
      ...message.user,
      user: this.usersService.transformToEntity(message.user),
    }));
  }

  async messageCreated() {
    return this.pubSub.asyncIterableIterator(MESSAGE_CREATED);
  }

  async countMessages(chatId: string) {
    return (
      await await this.chatsRepository.model.aggregate([
        { $match: { _id: new Types.ObjectId(chatId) } },
        { $unwind: '$messages' },
        { $count: 'messages' },
      ])
    )[0];
  }
}
