import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';

export class UpdateChatDto extends PartialType(CreateChatDto) {
  messages: Message[];
  users: User[];
}
