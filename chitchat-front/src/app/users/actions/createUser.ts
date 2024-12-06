"use server";

import { backendUrl } from "@/app/constants";
import { User } from "@/app/types";

type CreateUserDto = {
  username: string;
  email: string;
  birthdate: string;
};

export const createUser = async (createUserDto: CreateUserDto) => {
  const createUserUrl = `${backendUrl}/users`;

  console.log({ createUserUrl, createUserDto });

  const createUserResponse = await fetch(createUserUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createUserDto),
  });

  const createUserJson: User = await createUserResponse.json();
  console.log(JSON.stringify(createUserDto));

  console.log({ createUserJson });

  return createUserJson;
};
