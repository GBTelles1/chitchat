"use server";
import { revalidateCache } from "@/app/utils";
import { createChat } from "../../actions";

export async function submitCreateChatForm(
  previousState: string,
  formData: FormData
) {
  const chatName = formData.get("chatName") as string;

  if (!chatName) {
    return "You must give the chat a name";
  }

  const createdChat = await createChat(chatName);

  if (!createdChat) {
    return "Something went wrong when creating the chat. Make sure you gave a valid name and try again.";
  }

  await revalidateCache();

  return "Chat successfully created";
}
