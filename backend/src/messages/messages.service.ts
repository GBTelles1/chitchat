import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create({ content, user, chat }: CreateMessageDto) {
    return this.messageRepository.save({ content, user, chat });
  }

  async findAll() {
    return await this.messageRepository.find({
      relations: {
        chat: true,
        user: true,
      },
    });
  }

  async findOne({
    id,
    includeChat = true,
    includeUser = true,
  }: {
    id: string;
    includeChat?: boolean;
    includeUser?: boolean;
  }) {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: { chat: includeChat, user: includeUser },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.messageRepository.save({
      id,
      ...updateMessageDto,
    });

    return updatedMessage;
  }

  async remove(id: string) {
    return await this.messageRepository.delete(id);
  }
}
