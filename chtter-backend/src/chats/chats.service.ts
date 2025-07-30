import { Injectable } from '@nestjs/common';

import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  currentUserChatFilter(userId: string) {
    return {
      $or: [
        { userId },
        {
          userIds: {
            $in: [userId],
          },
        },
        { isPrivate: false },
      ],
    };
  }

  async create(createChatInput: CreateChatInput, userId: string) {
    return await this.chatsRepository.create({
      ...createChatInput,
      userId,
      userIds: createChatInput.userIds || [],
      messages: [],
      lastMessageAt: new Date(),
    });
  }

  async findAll(userId: string) {
    return await this.chatsRepository.find(
      { ...this.currentUserChatFilter(userId) },
      { lastMessageAt: -1 },
    );
  }

  async findOne(_id: string) {
    return await this.chatsRepository.findOne({ _id });
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
