"use server";
import { backendUrl } from "@/app/constants";
import { revalidateCache } from "@/app/utils";

type CreateChatResponse = { id: number; name: string };

export const createChat = async (name: string): Promise<CreateChatResponse> => {
  const createChatUrl = `${backendUrl}/chats`;

  const createChatResponse = await fetch(createChatUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const createChatJson: CreateChatResponse = await createChatResponse.json();

  await revalidateCache();

  return createChatJson;
};
