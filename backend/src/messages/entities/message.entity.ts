import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Chat } from 'src/chats/entities/chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  sentAt: Date;

  @ManyToOne(() => User, (user) => user.messages, { nullable: false })
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages, {
    nullable: false,
  })
  chat: Chat;
}
