import db from "../db";
import { getSelf } from "./auth-service";

export const isFollowingUser = async (id: string) => {
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

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followingId: otherUser.id,
        follwerId: self.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) throw new Error("User not found");

    if (otherUser.id === self.id) throw new Error("You cannot follow yourself");

    const existingFollow = await db.follow.findFirst({
      where: {
        follwerId: self.id,
        followingId: otherUser.id,
      },
    });
    if (existingFollow) throw new Error("Already following");

    const createFollow = await db.follow.create({
      data: {
        follwerId: self.id,
        followingId: otherUser.id,
      },
      include: {
        follower: true,
        following: true,
      },
    });

    return createFollow;
  } catch (err) {
    console.log("Error", err);
  }
};
