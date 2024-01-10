import db from "@/db";
import { getSelf } from "./auth-service";
import { User } from "@prisma/client";

export const getRecommended = async () => {
  let userId;
  let users: User[] = [];

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (err) {
    userId = null;
  }

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              follewedBy: {
                some: {
                  follwerId: userId,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
