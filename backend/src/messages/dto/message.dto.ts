import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ChatDto } from 'src/chats/dto/chat.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsDateString()
  sentAt: Date;

  user: UserDto;

  chat: ChatDto;
}
