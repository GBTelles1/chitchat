"use server";
import { createUser } from "@/app/users/actions";
import { revalidateCache } from "@/app/utils";
import { cookies } from "next/headers";

export async function submitRegisterForm(
  previousState: string,
  formData: FormData
) {
  const cookieStore = await cookies();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const birthdate = formData.get("birthdate") as string;

  if (!username) {
    return "You must give the chat a name";
  }

  if (email && birthdate) {
    const user = {
      username,
      email,
      birthdate,
    };

    const createdUser = await createUser(user);

    if (!createdUser) {
      return "Something went wrong when creating the user. Make sure you gave valid inputs and try again.";
    }

    cookieStore.set({
      name: "userId",
      value: createdUser.id,
      path: "/",
      maxAge: 60 * 60 * 24,
      expires: new Date(Date.now() + 60 * 60 * 24),
    });

    await revalidateCache();

    return "User successfully created";
  }

  cookieStore.set({
    name: "anonymousUser",
    value: username,
    path: "/",
    maxAge: 60 * 60 * 24,
    expires: new Date(Date.now() + 60 * 60 * 24),
  });

  return `Anonymous user {${username}} created`;
}
