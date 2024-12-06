import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string;
}
