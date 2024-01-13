import db from "@/db";
import { currentUser } from "@clerk/nextjs";

export const getSelf = async () => {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error("You are Unauthrized");
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


export const getSelfByUserName = async (username: string) => {
  const self = await currentUser();
  if(!username) throw new Error("User not found");
  
  if(!self || !self.username) {
    throw new Error("You are not Authenticated");
  }

  const user = await db.user.findUnique({
    where: {
      username: username
    }
  })
  if(!user) {
    throw new Error("User not found");
  }
  if(self.username !== user.username) {
    throw new Error("You are unauthrized");
    
  }
  return user;
}
