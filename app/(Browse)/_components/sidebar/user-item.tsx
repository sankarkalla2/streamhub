"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/store/use-sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserAvatar, { UserAvatarSkeletonProps } from "@/components/user-avatar";
import LiveBadge from "@/components/liv-badge";

interface UserItemsProps {
  username: string;
  imgUrl: string;
  isLive: boolean;
}
const UserItem = ({ username, imgUrl, isLive }: UserItemsProps) => {
  const { collapsed } = useSidebar((state) => state);
  const pathname = usePathname();
  const href = `/${username}`;
  const isActive = pathname === href;
  return (
    <Button
      asChild
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
      size="sm"
      variant="ghost"
    >
      <Link
        href={href}
        className={cn(
          "flex items-center w-full gap-x-2",
          collapsed && "justify-center"
        )}
      >
        <UserAvatar
          username={username}
          isLive={isLive}
          imgUrl={imgUrl}
          isBadge
        />
        {!collapsed && <p className="truncate">{username}</p>}
        {!collapsed && isLive && <LiveBadge className="ml-auto" />}
      </Link>
    </Button>
  );
};

export const RecommnedSkeleton = () => {
  return <ul>{[...Array(3).map((_, i) => <UserAvatarSkeletonProps key={i}/>)]}</ul>;
};

export default UserItem;
