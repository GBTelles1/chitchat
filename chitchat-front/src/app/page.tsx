import styles from "./page.module.css";
import { ChatList } from "./components/ChatList";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { LogoutButton } from "./components/LogoutButton";

export default async function Home() {
  const cookieStore = await cookies();

  const anonymousUser = cookieStore.get("anonymousUser");

  const userId = cookieStore.get("userId") || "";

  if (!anonymousUser && !userId) {
    redirect("/login");
  }

  return (
    <div className={styles.page}>
      <ChatList />

      <Link className={styles.createChatLink} href={"/chats/create"}>
        New Chat
      </Link>

      <LogoutButton />
    </div>
  );
}
