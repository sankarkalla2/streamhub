"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import UserItem from "./user-item";

interface FollowingProps {
  data: (Follow & { following: User })[];
}
const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar();
  const showLabel = !collapsed && data.length;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 pt-2 text-muted-foreground">Follwing</div>
      )}
      <div className="px-2 pt-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.following.username}
            imgUrl={user.following.imageUrl}
            isLive={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Following;
