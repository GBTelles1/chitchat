import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.save(createUserDto);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: {
        chats: true,
        messages: true,
      },
    });
  }

  async findOneById({
    id,
    includeMessages = true,
    includeChats = true,
  }: {
    id: string;
    includeMessages?: boolean;
    includeChats?: boolean;
  }): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { messages: includeMessages, chats: includeChats },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail({
    email,
    includeMessages = true,
    includeChats = true,
  }: {
    email: string;
    includeMessages?: boolean;
    includeChats?: boolean;
  }): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: { messages: includeMessages, chats: includeChats },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersRepository.save({
      id,
      ...updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
