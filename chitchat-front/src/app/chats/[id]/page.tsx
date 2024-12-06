import Link from "next/link";
import { getChatById } from "../actions";
import { getUserById } from "@/app/users/actions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ChatRoom } from "@/app/components/ChatRoom";
import { MessageWithUser } from "@/app/types";
import styles from "./ChatPage.module.css";

type ChatPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const cookieStore = await cookies();

  const anonymousUser = cookieStore.get("anonymousUser")?.value;

  const userId = cookieStore.get("userId") || "";

  if (!anonymousUser && !userId) {
    redirect("/login");
  }

  const { id: chatId } = await params;

  const chat = await getChatById(Number(chatId));

  const user = await getUserById(String(userId));

  const currentUser = user || String(anonymousUser);

  return (
    <div className={styles.page}>
      <Link href={"/"}>Home</Link>

      <ChatRoom
        chatId={chat.id}
        chatName={chat.name}
        users={chat.users}
        messages={chat.messages as MessageWithUser[]}
        currentUser={currentUser}
      />
    </div>
  );
}
