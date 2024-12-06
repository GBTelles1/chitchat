import { getAllChats } from "@/app/chats/actions";
import Link from "next/link";
import styles from "./ChatList.module.css";

export const ChatList = async () => {
  const allChats = await getAllChats();

  return (
    <div className={styles.page}>
      <h1>Chats: </h1>
      <div className={styles.chatList}>
        {allChats.length > 0 ? (
          allChats.map((chat) => {
            return (
              <Link key={`${chat.id}`} href={`/chats/${chat.id}`}>
                {chat.name}
              </Link>
            );
          })
        ) : (
          <div>No chats</div>
        )}
      </div>
    </div>
  );
};
