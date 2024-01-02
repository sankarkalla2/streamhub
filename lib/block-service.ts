import db from "@/db";
import { getSelf } from "./auth-service";
import { error } from "console";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) return false;
    const isBlocked = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: self.id,
          blockerId: otherUser.id,
        },
      },
    });

    return !!isBlocked;
  } catch (err) {
    return false;
  }
};

export const blockUser = async (id: string) => {
  try {
    const self = await getSelf();
    if (self.id === id) throw new Error("You can't block yourself");

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }

    const blockedUser = await db.block.create({
      data: {
        blockedId: otherUser.id,
        blockerId: self.id,
      },
    });

    return blockedUser;
  } catch (err: any) {
    throw new Error("Internel server error");
  }
};
