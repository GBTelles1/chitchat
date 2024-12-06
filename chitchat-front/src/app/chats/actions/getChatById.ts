"use server";

import { backendUrl } from "@/app/constants";
import { Chat } from "@/app/types";

export const getChatById = async (id: number): Promise<Required<Chat>> => {
  const getChatByIdUrl = `${backendUrl}/chats/${id}`;

  const getChatByIdResponse = await fetch(getChatByIdUrl, {
    next: {
      tags: [`chat-${id}`],
    },
  });

  const getChatByIdJson: Required<Chat> = await getChatByIdResponse.json();

  return getChatByIdJson;
};
