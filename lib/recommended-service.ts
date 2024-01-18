import db from "@/db";
import { getSelf } from "./auth-service";
import { Stream, User } from "@prisma/client";

export const getRecommended = async () => {
  let userId;
  let users = [];

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
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
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
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
    });
  }

  return users;
};
