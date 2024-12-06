import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { ChatDto } from 'src/chats/dto/chat.dto';
import { MessageDto } from 'src/messages/dto/message.dto';

export class UserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  birthdate: Date;

  @IsBoolean()
  isActive: boolean;

  messages: MessageDto[];

  chats: ChatDto[];
}
