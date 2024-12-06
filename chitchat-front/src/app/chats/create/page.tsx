import { redirect } from "next/navigation";
import { CreateChatForm } from "./components/CreateChatForm";
import { CreateChatPage } from "./components/CreateChatPage";
import { cookies } from "next/headers";

export default async function CreateChat() {
  const cookieStore = await cookies();

  const anonymousUser = cookieStore.get("anonymousUser");

  const userId = cookieStore.get("userId") || "";

  if (!anonymousUser && !userId) {
    redirect("/login");
  }

  return (
    <CreateChatPage>
      <CreateChatForm />
    </CreateChatPage>
  );
}
