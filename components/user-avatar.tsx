import { cva, VariantProps } from "class-variance-authority";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import LiveBadge from "./liv-badge";

const avatarSize = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
interface UserAvatar extends VariantProps<typeof avatarSize> {
  isLive?: boolean;
  isBadge?: boolean;
  imgUrl: string;
  username: string;
}

const UserAvatar = ({
  isLive,
  isBadge,
  size,
  username,
  imgUrl,
}: UserAvatar) => {
  const canShowBadge = isLive && isBadge;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          "",
          isLive &&
            "border ring-2 ring-rose-500 border-background transition-colors",
          avatarSize({ size })
        )}
      >
        <AvatarImage src={imgUrl} className="object-cover" />
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSize> {}

export const UserAvatarSkeletonProps = ({ size }: UserAvatarSkeletonProps) => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1 ">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};

export default UserAvatar;
