import { Chat } from "./Chat";
import { Message } from "./Message";

export type User = {
  id: string;
  username: string;
  email: string;
  birthdate: string;
  isActive: boolean;
  chats?: Chat[];
  messages?: Message[];
};
