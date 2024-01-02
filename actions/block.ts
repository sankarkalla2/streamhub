import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  const blocked = await blockUser(id);
  revalidatePath("/");
  if (blocked) {
    revalidatePath(`/${blocked.blocked.username}`);
    return blocked;
  }
};

export const onUnBlock = async (id: string) => {
  const unblock = await unblockUser(id);
  revalidatePath("/");
  if (unblock) {
    revalidatePath(`${unblock.blocked.username}`);
    return unblock;
  }
};
