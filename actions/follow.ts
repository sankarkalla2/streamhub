"use server";

import { followUser, unFollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";
export const onFollow = async (id: string) => {
  try {
    const follow = await followUser(id);

    revalidatePath("/");
    if (follow) {
      revalidatePath(`/${follow.following.username}`);
    }
    console.log("Iam same as server component", id);
  } catch (err: any) {
    throw new Error("Internel server error", err);
  }
};

export const onUnFollow = async (id: string) => {
  try {
    revalidatePath("/");
    const unfollow = await unFollowUser(id);
    if (unfollow) {
      revalidatePath(`/${unfollow.following.username}`);
    }
    console.log("iam server component i can deal with api calls")
  } catch (err: any) {
    throw new Error("Internel server error", err);
  }
};
