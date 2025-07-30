import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JWTPayload } from 'src/auth/types/jwt-payload.interface';
import { GetMessagesArgs } from './dto/get-messages.args';
import { PUB_SUB } from 'src/common/injection-tokens';
import { MessageCreatedArgs } from './dto/message-created.args';

@Resolver()
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

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

  @Subscription(() => Message, {
    filter: (payload, variables, context) => {
      const userId = context.req.user._id;
      return (
        payload.messageCreated.chatId === variables.chatId &&
        userId !== payload.messageCreated.userId
      );
    },
  })
  messageCreated(
    @Args() messageCreatedArgs: MessageCreatedArgs,
    @CurrentUser() user: JWTPayload,
  ) {
    return this.messagesService.messageCreated(messageCreatedArgs, user._id);
  }
}
