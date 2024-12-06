"use server";

import { backendUrl } from "@/app/constants";
import { User } from "@/app/types";

export const getUserByEmail = async (
  email: string
): Promise<Required<User> | undefined> => {
  if (email === "") {
    return;
  }

  const getUserByEmailUrl = `${backendUrl}/users/email/${email}`;

  const getUserByEmailResponse = await fetch(getUserByEmailUrl, {
    next: {
      tags: [`user-${email}`],
    },
  });

  const getUserByEmailJson: Required<User> =
    await getUserByEmailResponse.json();

  if (!getUserByEmailJson) {
    return;
  }
  return getUserByEmailJson;
};
