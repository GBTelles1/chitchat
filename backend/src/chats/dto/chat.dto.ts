import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { MessageDto } from 'src/messages/dto/message.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class ChatDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  messages: MessageDto[];

  users: UserDto[];
}
