import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JWTPayload } from 'src/auth/types/jwt-payload.interface';
import { GetMessagesArgs } from './dto/get-messages.args';

@Resolver()
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args('createMessageInput') messageInput: CreateMessageInput,
    @CurrentUser() user: JWTPayload,
  ) {
    return await this.messagesService.createMessage(messageInput, user._id);
  }

  @Query(() => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args() getMessagesArgs: GetMessagesArgs,
    @CurrentUser() user: JWTPayload,
  ) {
    return await this.messagesService.getMessages(getMessagesArgs, user._id);
  }
}
