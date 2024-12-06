"use server";

import { revalidatePath, revalidateTag } from "next/cache";

type revalidateCacheTags = "allChats" | "all";

export async function revalidateCache(tag?: revalidateCacheTags) {
  switch (tag) {
    case "allChats":
      revalidateTag("allChats");
      break;
    case "all":
      revalidatePath("/", "layout");
      break;
    default:
      revalidateTag("allChats");
      break;
  }
}
