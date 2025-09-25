import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { MessagesService } from './messages.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('count')
  @UseGuards(JwtGuard)
  async countMessages(@Query('chatId') chatId: string) {
    return this.messagesService.countMessages(chatId);
  }
}
