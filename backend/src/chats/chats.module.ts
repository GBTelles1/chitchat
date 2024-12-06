import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UsersModule, MessagesModule],
  controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
