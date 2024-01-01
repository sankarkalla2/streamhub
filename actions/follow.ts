"use server";

import { followUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";
export const onFollow = async (id: string) => {
  try {
    const follow = await followUser(id);

    // revalidatePath("/");
    // if (follow) {
    //   revalidatePath(`/${follow.following.username}`);
    // }
    // console.log("Iam same as server component", id);
  } catch (err: any) {
    throw new Error("Internel server error", err);
  }
};
