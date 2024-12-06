import { IsNotEmpty, IsString } from 'class-validator';
import { ChatDto } from 'src/chats/dto/chat.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class CreateMessageDto {
  @IsString()
  content: string;

  @IsNotEmpty()
  chat: ChatDto;

  @IsNotEmpty()
  user: UserDto;
}
