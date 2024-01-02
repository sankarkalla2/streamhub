"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onUnFollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { followUser } from "@/lib/follow-service";

interface ActionsProps {
  isFollowing: boolean;
  user: User;
}
const Actions = ({ isFollowing, user }: ActionsProps) => {
  const [loading, startTransition] = useTransition();

  const handleFollow = async (id: string) => {
    onFollow(id)
      .then((data) => {
        toast.success(`You are following user`);
      })
      .catch((err: any) => {
        toast.error("Something went wrong");
      });
  };

  const handleUnfollow = async (id: string) => {
    onUnFollow(id)
      .then((data) => {
        toast.success(`You are unfollwing user`);
      })
      .catch((err: any) => {
        toast.error("something went wrong");
      });
  };
  const onClick = async () => {
    startTransition(async () => {
      if (isFollowing) {
        await handleUnfollow(user.id);
        return;
      }

      await handleFollow(user.id);
    });
  };
  return (
    <Button variant="primary" onClick={onClick} disabled={loading}>
      {isFollowing ? "UnFollow" : "Follow"}
    </Button>
  );
};

export default Actions;
