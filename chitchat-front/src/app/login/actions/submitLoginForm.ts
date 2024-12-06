"use server";
import { getUserByEmail } from "@/app/users/actions";
import { cookies } from "next/headers";

export async function submitLoginForm(
  previousState: string,
  formData: FormData
) {
  const cookieStore = await cookies();

  const email = formData.get("email") as string;

  if (!email) {
    return "You must input an email";
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return "Something went wrong when creating the user. Make sure you gave valid email and try again.";
  }

  cookieStore.set({
    name: "userId",
    value: user.id,
    path: "/",
    maxAge: 60 * 60 * 24,
    expires: new Date(Date.now() + 60 * 60 * 24),
  });

  return `Hello ${user.username}!`;
}
