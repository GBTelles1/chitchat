import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from 'src/messages/messages.service';
import { BadRequestException } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const {
      userId,
      chatId,
      anonymous,
    }: { userId: string; chatId: number; anonymous: boolean } =
      JSON.parse(data);

    const chatIdString = String(chatId);

    if (anonymous) {
      socket.join(chatIdString);
      return;
    }

    const user = await this.usersService.findOneById({ id: userId });

    const chat = await this.chatsService.findOne({ id: chatId });

    const userInChat = chat.users.find((chatUser) => chatUser.id === user.id);

    if (userInChat) {
      return;
    }

    await this.chatsService.saveUserInChat(chatId, user.id);

    socket.join(chatIdString);

    await this.sendNewMessage({
      content: 'I have entered the chat',
      chatId: chatId,
      userId: user.id,
      isAnonymous: false,
      socket: socket,
    });

    this.server.to(chatIdString).emit('onJoinChat', {
      user: user,
      message: `${user.username} have entered in the chat`,
    });

    console.log(`${user.username} have entered in the chat ${chatId}`);
  }

  @SubscribeMessage('leaveChat')
  async handleLeaveChat(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const {
      userId,
      chatId,
      anonymous,
    }: { userId: string; chatId: number; anonymous: boolean } =
      JSON.parse(data);

    const chatIdString = String(chatId);

    if (anonymous) {
      socket.leave(chatIdString);
      return;
    }

    const user = await this.usersService.findOneById({ id: userId });

    await this.sendNewMessage({
      content: 'I have left the chat',
      chatId: chatId,
      userId: user.id,
      isAnonymous: false,
      socket: socket,
    });

    await this.chatsService.removeUserFromChat(chatId, user.id);

    this.server.to(chatIdString).emit('onLeaveChat', {
      user: user,
      message: `${user.username} have left from chat`,
    });

    socket.leave(chatIdString);

    console.log(`${user.username} have left from chat ${chatId}`);
  }

  @SubscribeMessage('newMessage')
  async handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const {
      content,
      chatId,
      userId,
      anonymous,
    }: { content: string; chatId: number; userId: string; anonymous: boolean } =
      JSON.parse(data);

    const chatIdString = String(chatId);

    if (anonymous) {
      throw new BadRequestException(`Anonymous user cannot send messages`);
    }

    const user = await this.usersService.findOneById({
      id: userId,
      includeMessages: false,
    });

    const chat = await this.chatsService.findOne({
      id: chatId,
      includeMessages: false,
    });

    const userInChat = chat.users.find((chatUser) => chatUser.id === user.id);

    if (!userInChat) {
      throw new BadRequestException(`User not found in the chat: ${chat.name}`);
    }

    const createdMessage = await this.messagesService.create({
      content,
      chat,
      user,
    });

    this.server.to(chatIdString).emit('onNewMessage', {
      id: createdMessage.id,
      content: createdMessage.content,
      sentAt: createdMessage.sentAt,
      user: createdMessage.user,
    });
  }

  private async sendNewMessage({
    content,
    chatId,
    userId,
    isAnonymous,
    socket,
  }: {
    content: string;
    chatId: number;
    userId: string;
    isAnonymous: boolean;
    socket: Socket;
  }) {
    const newMessage = {
      content: content,
      chatId: chatId,
      userId: userId,
      anonymous: isAnonymous,
    };

    await this.handleMessage(JSON.stringify(newMessage), socket);
  }
}
