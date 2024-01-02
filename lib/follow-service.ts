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


export const followedUser = async() => {
  const self = await getSelf();
  
}

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

export const unFollowUser = async (id: string) => {
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

    const existingFollow = await db.follow.findFirst({
      where: {
        followingId: otherUser.id,
        follwerId: self.id,
      },
    });
    if (!existingFollow || otherUser.id === self.id) {
      throw new Error(
        "You are not allowed to unfollow who you are not following "
      );
    }

    const unfollow = await db.follow.delete({
      where: {
        id: existingFollow.id,
      },
      include: {
        follower: true,
        following: true,
      },
    });

    return unfollow;
  } catch (err: any) {
    console.log(err);
    throw new Error("Internel Server Error", err);
  }
};
