"use server";

import { backendUrl } from "@/app/constants";
import { User } from "@/app/types";

export const getUserById = async (
  id: string
): Promise<Required<User> | undefined> => {
  if (id === "") {
    return;
  }

  const getUserByIdUrl = `${backendUrl}/users/${id}`;

  const getUserByIdResponse = await fetch(getUserByIdUrl, {
    next: {
      tags: [`user-${id}`],
    },
  });

  const getUserByIdJson: Required<User> = await getUserByIdResponse.json();

  if (!getUserByIdJson) {
    return;
  }
  return getUserByIdJson;
};
