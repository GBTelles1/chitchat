import { Chat } from "./Chat";
import { User } from "./User";

export type BaseMessage = {
  id: string;
  content: string;
  sentAt: string;
};

export type Message = BaseMessage & {
  user?: User;
  chat?: Chat;
};

export type MessageWithUser = BaseMessage & {
  user: User;
};
