import { Injectable, NotFoundException } from '@nestjs/common';
import { PipelineStage, Types } from 'mongoose';

import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  // currentUserChatFilter(userId: string) {
  //   return {
  //     $or: [
  //       { userId },
  //       {
  //         userIds: {
  //           $in: [userId],
  //         },
  //       },
  //       { isPrivate: false },
  //     ],
  //   };
  // }

  async create(createChatInput: CreateChatInput, userId: string) {
    return await this.chatsRepository.create({
      ...createChatInput,
      userId,
      messages: [],
    });
  }

  async findMany(prePipelineStages: PipelineStage[] = []) {
    const chats = await this.chatsRepository.model.aggregate([
      ...prePipelineStages,
      { $set: { latestMessage: { $arrayElemAt: ['$messages', -1] } } },
      { $unset: 'messages' },
      {
        $lookup: {
          from: 'users',
          localField: 'latestMessage.userId',
          foreignField: '_id',
          as: 'latestMessage.user',
        },
      },
    ]);

    chats.forEach((chat) => {
      if (!chat.latestMessage._id) return delete chat.latestMessage;

      chat.latestMessage.user = chat.latestMessage.user[0];
      delete chat.latestMessage.userId;
      chat.latestMessage.chatId = chat._id;
    });

    return chats;
  }

  async findOne(_id: string) {
    const chats = await this.findMany([
      { $match: { _id: new Types.ObjectId(_id) } },
    ]);

    if (!chats[0]) throw new NotFoundException('Chat is not found');

    return chats[0];
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
