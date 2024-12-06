import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  users: User[];
}
