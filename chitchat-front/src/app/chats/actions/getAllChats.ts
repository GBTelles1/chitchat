"use server";
import { backendUrl } from "@/app/constants";
import { Chat } from "@/app/types";

export const getAllChats = async () => {
  const allChatsUrl = `${backendUrl}/chats`;

  const allChatsResponse = await fetch(allChatsUrl, {
    next: { tags: ["allChats"] },
  });

  if (allChatsResponse.status !== 200) {
    return [];
  }

  const allChatsResponseJson: Required<Chat>[] = await allChatsResponse.json();

  return allChatsResponseJson;
};
