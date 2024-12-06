import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,

    private readonly usersService: UsersService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const chat = await this.chatRepository.save(createChatDto);

    return chat;
  }

  async saveUserInChat(chatId: number, userId: string) {
    const user = await this.usersService.findOneById({ id: userId });

    const chat = await this.findOne({ id: chatId });

    const userInChat = chat.users.find((chatUser) => chatUser.id === user.id);

    if (!userInChat) {
      chat.users = [...chat.users, user];
      return await this.update(chat.id, chat);
    }

    return chat;
  }

  async removeUserFromChat(chatId: number, userId: string) {
    const user = await this.usersService.findOneById({ id: userId });

    const chat = await this.findOne({ id: chatId });

    const userInChat = chat.users.find((chatUser) => chatUser.id === user.id);

    if (!userInChat) {
      throw new BadRequestException('User not found in chat');
    }

    chat.users = chat.users.filter((chatUser) => chatUser.id !== user.id);

    return await this.update(chat.id, chat);
  }

  async findAll() {
    const chats = await this.chatRepository.find({
      relations: {
        messages: true,
        users: true,
      },
    });

    return chats;
  }

  async findOne({
    id,
    includeUsers = true,
    includeMessages = true,
    messageOrder = 'ASC',
  }: {
    id: number;
    includeUsers?: boolean;
    includeMessages?: boolean;
    messageOrder?: 'DESC' | 'ASC';
  }): Promise<Chat | null> {
    const chat = await this.chatRepository.findOne({
      where: { id },
      relations: {
        users: includeUsers,
        messages: includeMessages ? { user: true } : false,
      },
      order: {
        messages: {
          sentAt: includeMessages ? messageOrder : undefined,
        },
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const updateChat = await this.chatRepository.save({
      id,
      ...updateChatDto,
    });

    return updateChat;
  }

  async remove(id: number): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
