"use client";

import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import UserItem, { RecommnedSkeleton } from "./user-item";

interface RecommendedProps {
  data: User[];
}
const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 pt-2 text-muted-foreground"> Recommended </div>
      )}

      <div className="pt-2 px-2">
        {data &&
          data.map((user) => (
            <UserItem
              key={user.id}
              username={user.username}
              imgUrl={user.imageUrl}
              isLive={false}
            />
          ))}
      </div>
    </div>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed flex flex-col left-0 top-0 w-16 lg:w-60 bg-green-500 border border-r border-[#2D3E35] h-full z-50">
      <RecommnedSkeleton />
    </aside>
  );
};

export default Recommended;
